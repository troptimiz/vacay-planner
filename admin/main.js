var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var CategoryController = require('./controllers/CategoryController.js');
var ProductController = require('./controllers/ProductController.js');
var UserController = require('./controllers/UserController.js');
var path = require('path');



// Application configuration - Should be embody them in configuratio block

app.set('port',process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.engine('handlebars',handlebars.engine);
//app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

<!-- URL Mappings to check any possibility of any externalization -->

app.get("/",function(req,res){
	res.redirect('/categories');
});
app.get("/login",function(req,res){
	res.render('login');
});

// URL Mappings 
app.use('/categories',CategoryController);	
app.use('/products',ProductController);	
app.use('/account',UserController);	



//AppServer listening 

app.listen(app.get('port'),function(){
	console.log('vacay-planner admin server started on http://localhost:'+app.get('port')+' ; press Ctrl-C to terminate');
});