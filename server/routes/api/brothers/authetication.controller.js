const express = require('express');
const authController = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const passport = require('passport');
const { SecretOrKey } = JSON.parse(fs.readFileSync('config/secrets.json'));

const Brother = require('./brother');
const validateRegisterInput = require('../util/form-validation/register');
const validateLoginInput = require('../util/form-validation/login');
const { fileMiddleware, uploadToS3 } = require('../services/upload-s3');

authController.use(passport.initialize());
require('../../../config/passport')(passport);

/**
 * REGISTER Endpoint
 * @route POST api/auth/register
 * @param fileMiddleware multer middleware that parses form data (for file uploads)
 * @desc register a brother
 */
authController.post(
  '/register',
  [fileMiddleware, passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    // Form input validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Brother.findOne({ email: req.body.email }, async (brother) => {
      if (brother) {
        return res.status(400).json({ email: 'Email already exists' });
      }

      // Only upload file to S3 if included in form
      let filePath;
      if (req.file) {
        let fileExtension = req.file.originalname.split('.');
        fileExtension = fileExtension[fileExtension.length - 1];
        // Prefer to use student IDs for image paths moving forward, but use phone number if missing
        filePath = req.body.studentID
          ? `${req.body.pledgeClass}/${req.body.studentID}.${fileExtension}`
          : `${req.body.pledgeClass}/${req.body.phoneNumber}.${fileExtension}`;
        const bucketName =
          process.env.NODE_ENV === 'development'
            ? 'brother-headshots-dev'
            : 'brother-headshots-prod';

        await uploadToS3(
          bucketName,
          filePath,
          req.file.buffer,
          req.file.mimetype
        );
      }

      const newBrother = new Brother({
        name: req.body.name,
        email: req.body.email,
        studentID: req.body.studentID,
        phoneNumber: req.body.phoneNumber,
        password: `${req.body.pledgeClass}-${req.body.graduatingYear}`,
        major: req.body.major,
        graduatingYear: req.body.graduatingYear,
        pledgeClass: req.body.pledgeClass,
        position: req.body.position,
        isGraduated: req.body.isGraduated === 'true',
        isActive: req.body.isActive === 'true',
        biography: '',
        imagePath: filePath,
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
  }
);

/**
 * LOGIN Endpoint
 * @route POST api/auth/login
 * @desc login a brother
 */
authController.post('/login', (req, res) => {
  // Form input validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Brother.findOne({ email: req.body.email }).then((brother) => {
    if (!brother) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    if (brother.isGraduated || !brother.isActive) {
      return res
        .status(403)
        .json({ inactive: 'No inactive members or alumni beyond this point' });
    }

    const isMatch = bcrypt.compareSync(req.body.password, brother.password);
    if (isMatch) {
      // Create JWT payload
      const payload = {
        id: brother.id,
        name: brother.name,
      };
      // Sign token
      jwt.sign(payload, SecretOrKey, { expiresIn: 7200 }, (error, token) => {
        if (error) {
          throw new Error(error);
        }
        res.json({
          success: true,
          token: `Bearer ${token}`,
        });
      });
    } else {
      return res.status(400).json({ password: 'Password incorrect' });
    }
  });
});

module.exports = authController;
