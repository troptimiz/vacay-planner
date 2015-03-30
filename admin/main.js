var express = require('express');
var app = express();

app.set('port',process.env.PORT || 3000);

var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

<!-- URL Mappings -->

app.get("/",function(req,res){
	res.render('home');

});




app.listen(app.get('port'),function(){
	console.log('vacay-planner admin server started on http://localhost:'+app.get('port')+' ; press Ctrl-C to terminate');
});