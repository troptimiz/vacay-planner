 var express = require('express');
 var Passport = require('passport');
 var LocalStrategy = require('passport-local').Strategy;
 var UserController = express();
 var User = require('../models/users.js');

// passport configuration 


UserController.use(Passport.initialize());
UserController.use(Passport.session());

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

Passport.serializeUser(function(user, done) {
  done(null, user.id);
});

Passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});



Passport.use(new LocalStrategy(
  function(username, password, done) {
    findByUsername(username, function(err, user) {
        if (err) { 
          console.log('Error Occured During Authentication!!!');
          return done(err); 
        }
        if (!user) { 
          console.log('Unknown User!!!');
          return done(null, false, { message: 'Unknown user ' + username }); 
        }
        if (user.password != password) { 
          console.log('Wrong password!!!');
          return done(null, false, { message: 'Invalid password' }); 
        }
        console.log('Authentication Successful ...'+user);
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

UserController.get('/authenticate',Passport.authenticate('local'),function(req,res){
  console.log('Passport Authentication Done!!!');
  res.json({msg:'Authentication Successful'});

});

/*UserController.get('/authenticate',function(req,res){
   console.log("Inside Authentication!!!!");
    Passport.authenticate('local',function(req,res){
        res.json({msg: "authentication params" });
    });
});
*/

 module.exports = UserController;





