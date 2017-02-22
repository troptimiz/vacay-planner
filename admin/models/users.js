var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections
var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);	



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