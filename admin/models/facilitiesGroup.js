var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration 

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections

var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);	


var facilitiesGroupsSchema = mongoose.Schema({
	title:String,
	description:String,
	is_active:Boolean
});

var facilitiesGroups = mongoose.model('facilityGroups',facilitiesGroupsSchema);

module.exports = facilitiesGroups;

