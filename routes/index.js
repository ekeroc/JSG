var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res, next) {
  res.render('login')
});

router.post('/login', function(req, res, next) {

  var Users = {
    test1:{
      name: 'test1',
      password: 'password1'
    },
    test2:{
      name: 'test2',
      password: 'password2'
    }
  };
  user = Users[req.body.username]
  if (user && user.password == req.body.password) {
    res.render('index', { title: req.body.username })
  } else {
    res.render('login', { message: 'Invalid user' })
  }
});

module.exports = router;
