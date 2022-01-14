const express = require('express');
const brotherController = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Brother = require('./brother');
const validateEditInput = require('../util/form-validation/edit');
const validateWebmasterEditInput = require('../util/form-validation/webmaster-edit');
const { PositionEnum } = require('../util/enums/brother-enums');
const { fileMiddleware, uploadToS3 } = require('../services/upload-s3');

// Passport.js config (JWT extraction from request headers)
brotherController.use(passport.initialize());
require('../../../config/passport')(passport);

// Helper function: checks if user in JWT has access to an endpoint
const checkIfUserEndpointAccess = (
  requestObject,
  responseObject,
  positionsWithAccess
) => {
  let hasAccess = false;
  positionsWithAccess.forEach((position) => {
    if (position === requestObject.user.position) hasAccess = true;
  });

  if (!hasAccess) {
    return responseObject.status(403).json({
      message: `Forbidden: API endpoint only for use of: ${positionsWithAccess.toString()}`,
    });
  }
  return hasAccess;
};

/**
 * GET Endpoint (all brothers)
 * @route GET api/brothers
 * @desc retrieve all brothers
 */
brotherController.get('/', (req, res) => {
  const { brotherType, pledgeClass } = req.query;
  if (!brotherType) console.error('brotherType is a mandatory parameter');
  const queryObj = {};
  switch (brotherType) {
    case 'Alumni':
      queryObj.isGraduated = { $eq: true };
      queryObj.email = { $ne: 'sjsuthetatauwebmaster@gmail.com' };
      break;
    case 'Actives':
      queryObj.isGraduated = { $eq: false };
      queryObj.isActive = { $eq: true };
      queryObj.email = { $ne: 'sjsuthetatauwebmaster@gmail.com' };
      break;
    case 'Inactives':
      queryObj.isGraduated = { $eq: false };
      queryObj.isActive = { $eq: false };
      break;
    default:
      console.error('Unknown brother type passed');
  }
  if (pledgeClass && pledgeClass !== 'All') {
    queryObj.pledgeClass = { $eq: pledgeClass };
  }

  Brother.find(
    queryObj,
    {
      password: 0,
    },
    {
      sort: 'name',
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
 * Separate endpoint responding ONLY with fields necessary for pledge merits page
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
 * @route PUT api/brothers/me
 * @desc edit currently logged in bro
 */
brotherController.put(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const delta = req.body;

    // Form validation
    const { errors, isValid } = validateEditInput(delta);
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

/**
 * EDIT Endpoint
 * @route PUT api/brothers/edit
 * @desc edit any bro as webmaster
 */
brotherController.put(
  '/edit',
  [fileMiddleware, passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    // Check if JWT sent in request is webmaster
    checkIfUserEndpointAccess(req, res, [PositionEnum.WEBMASTER]);

    const delta = req.body;
    // eslint-disable-next-line no-underscore-dangle
    delete delta._id;

    const { errors, isValid } = validateWebmasterEditInput(delta);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let editedBro;
    try {
      // eslint-disable-next-line no-underscore-dangle
      editedBro = await Brother.findById(req.body.editedBroId);
    } catch (error) {
      return res.status(404).json({ message: 'Brother at _id not found' });
    }

    Object.entries(delta).forEach(([key, value]) => {
      if (key === 'newPassword') {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        editedBro.password = hash;
      } else {
        editedBro[key] = value;
      }
    });
    if (req.file) {
      const bucketName =
        process.env.NODE_ENV === 'development'
          ? 'brother-headshots-dev'
          : 'brother-headshots-prod';
      // fml
      await uploadToS3(
        bucketName,
        delta.imagePath ? delta.imagePath : editedBro.imagePath,
        req.file.buffer,
        req.file.mimetype
      );
    }
    editedBro.save();
    res.status(200).json(req.user);
  }
);

module.exports = brotherController;
