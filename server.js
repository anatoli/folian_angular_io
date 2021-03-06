// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var path = require('path');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 3000;

var passport = require('passport');
var flash    = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());



app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/scripts',  express.static(__dirname + '/scripts'));
// app.use('/styles',  express.static(__dirname + '/styles'));
app.use('/styles',  express.static(__dirname + '/css'));
app.use('/views',  express.static(__dirname + '/views'));
app.use('/app',  express.static(__dirname + '/app'));
app.use('/app',  express.static(__dirname + '/bower_components'));
app.use('/app',  express.static(__dirname + '/views'));






// app.use(express.static(path.join(__dirname, '../webapp')));

// app.use(express.static(path.join(__dirname, '../app')));
// app.use('/profile', express.static(path.join(__dirname, '../app/views')));
// app.use(express.static('../app/views'));
// app.use(express.static(path.join(__dirname, '../test/webapp/angular/libs')));

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(clientErrorHandler);


// routes ======================================================================
require('./app/routes_SAVE.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
