 var express = require('express');
 var Passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var UserController = express();
 var User = require('../models/users.js');

// passport configuration 

Passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({"username":username}, function(err, user) {
      if (err) {
       return done(err); 
   	}
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(typeof user.password == password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


//TODO:
// need to map url redirection 
// need to send JSON response 


UserController.get('/login',
	Passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}),
	function(req,res){
		res.json({ id: req.user.id, username: req.user.username });
	});

 module.exports = UserController;





