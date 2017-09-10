var express = require('express');
var router = express.Router();

/* router */
module.exports = function(passport){  
  router.post('/', passport.authenticate('local', {
      successRedirect: '/login/success',
      failureRedirect: '/login/failed'})
  );

  router.get('/failed', function(req, res) {
    res.status(401).json({status_code: 401, error: 'Login failed'});
  });

  router.get('/success', function(req, res) {
    if(!req.session.views)  
      req.session.views = 0;
    
    req.session.views++;
    res.json({
            username: req.user,
            sessionUser: req.session.passport.user, 
            sessionId: req.sessionID, 
            sessionInfo: req.session, 
            message: 'Login Successfully'});
  }); 

  router.post('/logout', function (req, res) {
    req.session.destroy();    
    req.logout();
    res.send('Log out');
  });

  return router;
}

// module.exports = router;

