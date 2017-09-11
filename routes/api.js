var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    return res.send(info);
  })(req, res, next);
});

module.exports = router;
