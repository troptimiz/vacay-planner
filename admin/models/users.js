var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vacayplanner',function(err){
	console.log('Connection occured while connecting to Mongo'+err);
});

var userSchema = mongoose.Schema({
	username:String,
	password:String,
	role:String,
	firstName:String,
	lastName:String,
	middleName:String,
	designation:String,
	emailAddress:String,
	is_active:Boolean
});

var User = mongoose.model('users',userSchema);

module.exports = User;