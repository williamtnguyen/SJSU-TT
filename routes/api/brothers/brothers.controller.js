const express = require('express');
const brotherController = express.Router();

const Brother = require('./brother');
const validateRegisterInput = require('../util/form-validation/register');

// CREATE Brother endpoint
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
      major: req.body.major,
      position: req.body.position,
      graduateYear: req.body.graduateYear,
      pledgeClass: req.body.pledgeClass,
      email: req.body.email,
    });

    newBrother
      .save()
      .then((storedBrother) => res.status(200).json(storedBrother))
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      });
  });
});
