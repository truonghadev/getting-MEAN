const express = require('express');
var router = express.Router();
const locations = require('./locations');

router.use('/', locations);

module.exports = router;
