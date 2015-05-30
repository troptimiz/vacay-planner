var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var CategoryController = require('./controllers/CategoryController.js');
var ProductController = require('./controllers/ProductController.js');
var UserController = require('./controllers/UserController.js');
var ClassificationController = require('./controllers/ClassificationController.js');
var path = require('path');
var Passport = require('passport');
 var flash = require('connect-flash'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var expressSession = require('express-session');

app.use(cookieParser());
app.use(expressSession({ secret: '1234QWERTY'}));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash());

// Application configuration - Should be embody them in configuratio block

app.set('port',process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.engine('handlebars',handlebars.engine);
//app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

<!-- URL Mappings to check any possibility of any externalization -->

app.get("/",function(req,res){

	res.redirect('/account/session');
	
});
app.get("/login",function(req,res){
	res.render('login');
});
app.get("/dashboard",function(req,res){
    if(req.session.passport.user)
	   res.render('dashboard',{layout:'dashboard'});
    else
        res.redirect('/account/session');
});

// URL Mappings 
app.use('/categories',CategoryController);	
app.use('/products',ProductController);	
app.use('/account',UserController);	
app.use('/classifications',ClassificationController);
app.get("/multiple",function(req,res){
    res.render('multiple-select',{layout:'dashboard'});
});




//AppServer listening 

app.listen(app.get('port'),function(){
	console.log('vacay-planner admin server started on http://localhost:'+app.get('port')+' ; press Ctrl-C to terminate');
});