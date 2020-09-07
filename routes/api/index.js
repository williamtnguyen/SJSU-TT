const express = require('express');
const router = express.Router();

// API Endpoints
const brothers = require('./brothers/brothers.controller');
router.use('/brothers', brothers);

module.exports = router;
