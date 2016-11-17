/**
 * Created by Anatoli on 09.09.2016.
 */
// app/routes.js
var path = require('path');
var dbconfig = require('../config/database');
var mysql = require('mysql');
var EventEmitter = require('events').EventEmitter;
var connection = mysql.createConnection(dbconfig.connection);
module.exports = function(app, passport) {


  // connection.query('USE' + dbconfig.database, function (err, rows) {
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("Alloha wse proshlo Norm");
  //   }
  // });

  app.on('error', function (err, row) {
    console.log(err);
  })
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {

    res.render('profile.ejs'); // load the index.ejs file
    // res.redirect('/login');
    // res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  // app.get('/login', function(req, res) {

  // res.redirect('/main');

  // render the page and pass in any flash data if it exists
  // res.render('index.html', { message: req.flash('loginMessage') });
  // res.render('index.ejs', { message: req.flash('loginMessage') });
  // });

  // process the login form
  // app.post('/login', passport.authenticate('local-login', {
  //        successRedirect : '/profile', // redirect to the secure profile section
  //        failureRedirect : '/', // redirect back to the signup page if there is an error
  //        failureFlash : true // allow flash messages
  // 	}),
  // function(req, res) {
  //   console.log("hello");
  //
  //   if (req.body.remember) {
  //     req.session.cookie.maxAge = 1000 * 60 * 10;
  //   } else {
  //     req.session.cookie.expires = false;
  //   }
  //   res.redirect('/');
  // );

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  app.set('views', path.join(__dirname, 'views'));
  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    // res.render('profile.ejs', {
    // 	user : req.user // get the user out of session and pass to template
    // });
    res.sendFile(path.join(__dirname+'/views/profile.html'),{user : req.user});

  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/User', function (req, res) {
    connection.query('SELECT * FROM users', function (err, rows) {
      if(!err) {
        res.json(rows);
      }else{
        res.json({"code" : 500, "status" : "Server Error"});
        res.send({"code" : 500, "status" : "Server Error"})
        return;
      }
    })
  });
  app.get('/api/Dealers', function (req, res) {
    connection.query('SELECT * FROM users WHERE ROLE LIKE "dealer" ', function (err, rows) {
      if(!err) {
        res.json(rows);
      }else{
        res.json({"code" : 500, "status" : "Server Error"});
        res.send({"code" : 500, "status" : "Server Error"})
        return;
      }
    })
  });
  app.get('/api/MaterialPolotno', function (req, res) {
    connection.query('SELECT * FROM materials WHERE TYPE LIKE "polotno"', function (err, rows) {
      if(!err) {
        res.json(rows);
      }else{
        res.json({"code" : 500, "status" : "Server Error"});
        res.send({"code" : 500, "status" : "Server Error"})
        return;
      }
    })
  });
  app.get('/api/MaterialAcessories', function (req, res) {
    connection.query('SELECT * FROM materials WHERE TYPE LIKE "acessories"', function (err, rows) {
      if(!err) {
        res.json(rows);
        res.end;
      }else{
        res.json({"code" : 500, "status" : "Server Error"});
        res.send({"code" : 500, "status" : "Server Error"})
        return;
      }
    })
  });

  app.post('/api/MaterialAcessories', function (req, res) {
console.log(req.body.name)
console.log(req.body.vendor)
console.log(req.body.type)
    connection.query('INSERT INTO materials (NAME, VENDOR, TYPE) VALUES ("'+req.body.name+'","'+req.body.vendor+'", "'+req.body.type+'", ', function (err, rows) {
      if(!err) {
        console.log('note error')
        res.json({"code" : 200, "status" : "Success"});
        res.send({"code" : 200, "status" : "Success"});
      }else{
        res.json({"code" : 500, "status" : "Server Error"});
        res.send({"code" : 500, "status" : "Server Error"})
        return;
      }
    })
  });

  app.get('/api/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });

  //   app.get('/api/login',  passport.authenticate('local-login', {
  //     successRedirect : '/office', // redirect to the secure profile section
  //     failureRedirect : '/', // redirect back to the signup page if there is an error
  //     failureFlash : true // allow flash messages
  // }),
  // function(req, res) {
  //   console.log("hello");
  //
  //   if (req.body.remember) {
  //     req.session.cookie.maxAge = 1000 * 60 * 10;
  //   } else {
  //     req.session.cookie.expires = false;
  //   }
  //   res.redirect('/');
  // })


};



// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
