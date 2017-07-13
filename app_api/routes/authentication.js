const express = require('express');
var router = express.Router();
const authenticationCtrl = require('../controllers/authentication');

router.post('/register', authenticationCtrl.register);
router.post('/login', authenticationCtrl.login);

module.exports = router;
