const express = require('express');
const brotherController = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Brother = require('./brother');
const validateEditInput = require('../util/form-validation/edit');

// Passport.js config (JWT extraction from request headers)
brotherController.use(passport.initialize());
require('../../../config/passport')(passport);

/**
 * GET Endpoint (all brothers)
 * @route GET api/brothers
 * @desc retrieve all brothers
 */
brotherController.get('/:tab', (req, res) => {
  const { tab } = req.params;
  const returnAlumni = tab === 'alumni';

  Brother.find(
    {
      email: { $ne: 'sjsuthetatauwebmaster@gmail.com' },
      isGraduated: { $eq: returnAlumni },
    },
    {
      password: 0,
    },
    (error, allBrothers) => {
      if (error) {
        return res.status(404).json({ message: `No brothers found: ${error}` });
      }
      res.status(200).json(allBrothers);
    }
  );
});

/**
 * GET Endpoint (all brothers in a pledge class)
 * @route GET api/brothers/:pledgeClass
 * @desc retrieve all bros in a pledge class
 */
brotherController.get(
  '/class/:pledgeClass',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { pledgeClass } = req.params;

    Brother.find({ pledgeClass }, (error, pledges) => {
      if (error) {
        return res
          .status(404)
          .json({ message: `No brothers exist in ${pledgeClass}: ${error}` });
      }

      const response = {
        userPledgeClass: '',
        currentPledges: [],
      };
      response.userPledgeClass = req.user.pledgeClass;
      pledges.forEach((pledge) => {
        response.currentPledges.push({
          key: pledge.id,
          name: pledge.name,
          studentID: pledge.studentID,
          meritCount: pledge.meritCount,
        });
      });
      res.status(200).json(response);
    });
  }
);

/**
 * GET Endpoint (one brother)
 * @route GET api/brothers/me/:page
 * @desc retrieve all info needed about brother depending on what page
 */
brotherController.get(
  '/me/:page',
  // passport.authenticate() validates the JWT in request header and gives req.user object
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { page } = req.params;

    // Respond with only needed fields for the page
    let responseObject;
    switch (page) {
      case 'dashboard':
        responseObject = req.user;
        break;
      case 'edit':
        responseObject = {
          email: req.user.email,
          biography: req.user.biography,
          major: req.user.major,
          graduatingYear: req.user.graduatingYear,
        };
        break;
      default:
        console.error(`Unknown page parameter passed, ${page}`);
    }
    res.status(200).json(responseObject);
  }
);

/**
 * EDIT Endpoint
 * @route PUT api/brothers/edit
 * @desc edit a bro page
 */
brotherController.put(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const delta = req.body;

    // Form validation
    const { errors, isValid } = validateEditInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (
      delta.oldPassword &&
      delta.newPassword &&
      !bcrypt.compareSync(delta.oldPassword, req.user.password)
    ) {
      return res.status(400).json({ password: 'Old password was incorrect' });
    }

    Object.entries(delta).forEach(([key, value]) => {
      if (key === 'newPassword') {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        req.user.password = hash;
      } else {
        req.user[key] = value;
      }
    });
    req.user.save();

    res.status(200).json(req.user);
  }
);

module.exports = brotherController;
