const express = require('express');
const brotherController = express.Router();

const Brother = require('./brother');
const validateRegisterInput = require('../util/form-validation/register');

/**
 * Register Endpoint
 * @route POST api/brothers/
 * @desc register a brother
 */
brotherController.post('/', (req, res) => {
  // Form input validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Brother.findOne({ email: req.body.email }).then((brother) => {
    if (brother) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const newBrother = new Brother({
      name: req.body.name,
      email: req.body.email,
      password: `${req.body.pledgeClass}-${req.body.graduatingYear}`,
      major: req.body.major,
      graduatingYear: req.body.graduatingYear,
      pledgeClass: req.body.pledgeClass,
      position: req.body.position,
    });

    newBrother
      .save()
      .then((storedBrother) => res.status(200).json(storedBrother))
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      });
  });
});

/**
 * Login Endpoint
 * @route POST api/brothers/login
 * @desc login a brother
 */

module.exports = brotherController;
