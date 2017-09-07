var express = require('express');
var router = express.Router();

/* router */
module.exports = function(passport){  
  /* GET login page. */
  router.get('/', function(req, res) {
    res.send('222222222');
  });

  /* Handle Login POST */
  router.post('/', passport.authenticate('local', {
      successRedirect: '/login',
      failureRedirect: '/login.html',
      failureFlash: 'Invalid username or password.',
      successFlash: 'Welcome!'})
  );

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
}

// module.exports = router;

