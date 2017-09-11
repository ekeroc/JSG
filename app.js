var bodyParser = require('body-parser');
var express = require('express');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');
var passport = require('passport');

var api = require('./routes/api')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

passport.use('local', new LocalStrategy(
  function(username, password, done) {
    if(username == 'testing' && password == '1234eszxcv') {
        return done(null, {}, {'status': 'ok', 'token': 'VBa35EWz4v31Pw2V4mIemGwR'});
    } else {
        return done(null, {}, {'status': 'error'});
    }
  }
));

app.use(passport.initialize());

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    res.send('error');
});

module.exports = app;
