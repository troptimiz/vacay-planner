var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var Categories = require('./models/categories.js');
var Products = require('./models/products.js');

// Application configuration - Should be embody them in configuratio block

app.set('port',process.env.PORT || 3000);

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

<!-- URL Mappings to check any possibility of any externalization -->


app.get("/",function(req,res){
	res.render('home');
});

app.get('/categories',function(req,res){
	Categories.find({'is_active':true},function(err,categories){
		res.status(200).json({activeCategories:categories});
	});	
});


app.get('/categories/:id',function(req,res){
	Categories.findById(req.params.id,function(err,category){
		res.status(200).json({category:category});
	})
});




//AppServer listening 

app.listen(app.get('port'),function(){
	console.log('vacay-planner admin server started on http://localhost:'+app.get('port')+' ; press Ctrl-C to terminate');
});