const passport = require('passport');
const mongoose = require('mongoose');
var User = mongoose.model('User');

function sendJsonResponse(res, status, content) {
  res.status(status).json(content);
}

function register(req, res) {
  if (!req.body.email || !req.body.name || !req.body.password) {
    sendJsonResponse(res, 400, {
      message: 'All fields required'
    });
    return;
  }
  var user = new User();
  user.email = req.body.email;
  user.name = req.body.name;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    var token;
    if (err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    token = user.generateJwt();
    sendJsonResponse(res, 200, {token: token});
  });
}

function login(req, res) {
  if (!req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      message: 'All fields required'
    });
    return;
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    var token;
    if (user) {
      console.log(user);
      token = user.generateJwt();
      sendJsonResponse(res, 200, {token: token});
    } else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);
}

module.exports = {
  register: register,
  login: login
};
