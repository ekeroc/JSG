var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/me', passport.authenticate('jwt', {session: false}),
  function(req, res) {
    res.send({'username': req.user.username, 'id': req.user.id});
  }
);

module.exports = router;
