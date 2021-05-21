const express = require('express');
const router = express.Router();

// API Endpoints
const authentication = require('./brothers/authetication.controller');
router.use('/auth', authentication);
const brothers = require('./brothers/brothers.controller');
router.use('/brothers', brothers);
const merits = require('./merits/merits.controller');
router.use('/merits', merits);

module.exports = router;
