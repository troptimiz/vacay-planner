var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var CategoryController = require('./controllers/CategoryController.js');



// Application configuration - Should be embody them in configuratio block

app.set('port',process.env.PORT || 3000);

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

<!-- URL Mappings to check any possibility of any externalization -->


app.get("/",function(req,res){
	res.render('home');
});


// URL Mappings 

app.use('/cat',CategoryController);



//AppServer listening 

app.listen(app.get('port'),function(){
	console.log('vacay-planner admin server started on http://localhost:'+app.get('port')+' ; press Ctrl-C to terminate');
});