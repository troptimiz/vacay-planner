var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration 

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections

var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);	


var statesSchema = mongoose.Schema({
	stateName:String,
    countryCode:String,
    stateCode:String
});

var states = mongoose.model('states',statesSchema);

module.exports = states;

