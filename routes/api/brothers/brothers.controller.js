const express = require('express');
const brotherController = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { SecretOrKey } = JSON.parse(fs.readFileSync('config/secrets.json'));

const Brother = require('./brother');
const validateRegisterInput = require('../util/form-validation/register');
const validateLoginInput = require('../util/form-validation/login');

/**
 * GET Endpoint
 * @route GET api/brothers
 * @desc retrieve all brothers
 */
brotherController.get('/', (req, res) => {
  Brother.find({}, (err, allBrothers) => {
    if (err) {
      return res.status(404).json({ message: `No brothers found: ${err}` });
    }
    res.status(200).json(allBrothers);
  });
});

/**
 * REGISTER Endpoint
 * @route POST api/brothers/register
 * @desc register a brother
 */
brotherController.post('/register', (req, res) => {
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

    // Hash password before storing in database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newBrother.password, salt);
    newBrother.password = hash;

    newBrother
      .save()
      .then((storedBrother) => res.status(200).json(storedBrother))
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      });
  });
});

/**
 * LOGIN Endpoint
 * @route POST api/brothers/login
 * @desc login a brother
 */
brotherController.post('/login', (req, res) => {
  // Form input validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Brother.findOne({ email: req.body.email }).then((brother) => {
    if (!brother) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    const isMatch = bcrypt.compareSync(req.body.password, brother.password);
    if (isMatch) {
      // Create JWT payload
      const payload = {
        id: brother.id,
        name: brother.name,
      };
      // Sign token
      jwt.sign(
        payload,
        SecretOrKey,
        { expiresIn: 31556926 },
        (error, token) => {
          if (error) {
            throw new Error(error);
          }
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: 'Password incorrect' });
    }
  });
});

module.exports = brotherController;
