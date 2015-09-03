var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration 

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections

var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);	


var taxSchema = mongoose.Schema({
	taxDescription:String,
	state:String,
    tax:Number,
    taxTypeId: String
});

var tax = mongoose.model('tax',taxSchema);

module.exports = tax;

