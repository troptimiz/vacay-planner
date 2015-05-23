 var express = require('express');
 var Passport = require('passport');
 var BasicStrategy = require('passport-http').BasicStrategy;
 var UserController = express();
 var User = require('../models/users.js');

// passport configuration 

Passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { 
          console.log("Inside 1st Error block");
          return done(err);
      }
      if (!user) {
          console.log("Inside 2nd Error when it's not user");
          return done(null, false); 
      }
      if (!user.verifyPassword(password)) { 
          console.log("Inside 3rd Error VerifyPassword");
          return done(null, false); 
      }
      return done(null, user);
    });
  }
));

UserController.get("/login",function(req,res){
	res.render("login");
});
//TODO:
// need to map url redirection 
// need to send JSON response 
//UserController.use(Passport.initialize());
//UserController.use(Passport.session());

UserController.get('/authenticate',function(req,res){
   console.log("Inside Authentication!!!!");
   //res.render("User authenticated Successfully!!!");
    //res.json({ msg:"User authenticated" });
    Passport.authenticate('basic',function(req,res){
        res.json({msg: "authentication params" });
    });
});
                    
                    
//	Passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}),
//	function(req,res){
//		res.json({ id: req.user.id, username: req.user.username });
//	});

 module.exports = UserController;





