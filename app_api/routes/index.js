const express = require('express');
var router = express.Router();
const locations = require('./locations');
const authentication = require('./authentication');

router.use('/', locations);
router.use('/authentication', authentication);

module.exports = router;
