// app/routes.js
var path = require('path');
var dbconfig = require('../config/database');
var fs = require('fs');
var passport = require('passport');
var mysql = require('mysql');
var mysqlModel = require('mysql-model');
var EventEmitter = require('events').EventEmitter;
var connection = mysql.createConnection(dbconfig.connection);
module.exports = function(app, passport) {

  // setInterval(function () {
  //
  //   connection.query('SELECT 1');
  //   // console.log(c++);
  // }, 5000);



  connection.query('USE ' + dbconfig.database, function (err, rows) {
    if(err){
      console.log(err);
    }else{
      console.log(rows + "Alloha wse proshlo Norm");
    }
  });
  app.on('error', function (err, row) {
    // console.log(err);
  })
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('profile.ejs'); // load the index.ejs file
		// res.redirect('/login');
		// res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
	});


	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
  app.set('views', path.join(__dirname, 'views'));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


  app.get('/api/User', function (req, res) {
    var arr = {};
    connection.query("SELECT * FROM users", function (err, rows) {
      if (err) {
        console.log("Errorororooror")
        return err;
      }
      if (!rows.length) {
        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      }
      res.send(rows);
    });
  });


  app.get('/api/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
          res.send(user);
        // return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });

};
