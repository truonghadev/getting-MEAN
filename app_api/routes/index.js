const express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const locations = require('./locations');
const authentication = require('./authentication');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

router.use('/locations', auth, locations);
router.use('/authentication', authentication);

module.exports = router;
