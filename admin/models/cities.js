var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration 

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections

var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);	


var citiesSchema = mongoose.Schema({
	cityName:String,
    stateCode:String
});

var cities = mongoose.model('cities',citiesSchema);

module.exports = cities;

