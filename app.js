var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var passport = require('passport');
var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config.js');
var userDatas = require('./users.json');

var api = require('./routes/api');
var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

var options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
}
passport.use(new jwtStrategy(options, function(jwt_payload, done) {
  var user;
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i]['id'] == jwt_payload.sub) {
      user = userDatas[i];
      return done(null, user);
    }
  }
  return done(null, false);
}));

app.use(passport.initialize());

app.use('/api', api);
app.use('/users', users);

app.use(function(req, res, next) {
  res.sendStatus(404);
});

module.exports = app;
