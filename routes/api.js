var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');
var userDatas = require('../users.json');

var router = express.Router();

router.post('/login', function(req, res) {
  if (req.body.username && req.body.password) {
    var user;
    for (var i = 0; i < userDatas.length; i++) {
      if (userDatas[i]['username'] == req.body.username) {
        user = userDatas[i];
        break;
      }
    }
    if (!user) {
      res.sendStatus(403);
    } else if (user['password'] != req.body.password) {
      res.sendStatus(403);
    } else {
      var expireTimestamp = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
      var token = jwt.encode({'sub': user.id, 'exp': expireTimestamp}, config.jwtSecret);
      res.send({'token': token});
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
