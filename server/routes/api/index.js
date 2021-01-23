const express = require('express');
const router = express.Router();

// API Endpoints
const brothers = require('./brothers/brothers.controller');
router.use('/brothers', brothers);
const merits = require('./merits/merits.controller');
router.use('/merits', merits);

module.exports = router;
