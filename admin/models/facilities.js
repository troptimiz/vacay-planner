var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration 

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections

var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);	


var facilitiesSchema = mongoose.Schema({
	name:String,
	description:String,
    facilityGroupId: String
});

var facilities = mongoose.model('facilities',facilitiesSchema);

module.exports = facilities;

