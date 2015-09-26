 var express = require('express');
 var Passport = require('passport');
 var flash = require('connect-flash'); 
 var LocalStrategy = require('passport-local').Strategy;
 var UserController = express();
 var User = require('../models/users.js');
 var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var expressSession = require('express-session');
// passport configuration 


UserController.use(cookieParser());
UserController.use(expressSession({ secret: '1234QWERTY'}));
UserController.use(Passport.initialize());
UserController.use(Passport.session());
UserController.use(flash());
UserController.use(bodyParser());


/*
var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];
*/

function findById(id, fn) {
  //console.log('Find By ID Invoked '+id);
  User.findById(id,function(err,user){
    if(err){
       fn(new Error('User ' + id + ' does not exist'));
    }else{
         fn(null,user);
    }
  });
}
/*
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }

}*/


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
  //console.log('Deserialize User Invoked ...');
  findById(id, function (err, user) {
    done(err, user);
  });
});



Passport.use(new LocalStrategy(
  function(username, password, done) {
    /*findByUsername(username, function(err, user) {
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
   });*/
      User.findOne({ username: username }, function (err, user) {
         if (err) { 
              //console.log('Error Occured During Authentication!!!');
              return done(err); 
            }
            if (!user) { 
              //console.log('Unknown User!!!');
              return done(null, false, { message: 'Unknown user ' + username }); 
            }
            if (user.password != password) { 
              //console.log('Wrong password!!!');
              return done(null, false, { message: 'Invalid password' }); 
            }
            //console.log('Authentication Successful ...'+user);
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

UserController.get('/authenticate',
                    Passport.authenticate('local',{ 
                        failureRedirect: '/account/login',
                        successRedirect:'/dashboard',failureFlash:true
                    }),
                   function(req,res){
                        //console.log('Passport Authentication Done!!!');
                        req.session.message="Authentication Successful";
                        res.redirect('/dashboard');
                });

/*UserController.get('/authenticate',function(req,res){
   console.log("Inside Authentication!!!!");
    Passport.authenticate('local',function(req,res){
        res.json({msg: "authentication params" });
    });
});
*/

UserController.get('/session',function(req,res){
  //res.json({'UserID':req.session.passport.user});
    console.log(req.params.url);
    if(req.session.passport.user){
        res.redirect("/dashboard");
    }
    else{
        res.redirect("/account/login");   
    }

});
UserController.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/account/session");
});


 module.exports = UserController;





