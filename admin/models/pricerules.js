var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration 

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections

var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);	


var priceRulesSchema = mongoose.Schema({
	title:String,
	description:String,
    cost: Number,
    costType: String
});

var priceRules = mongoose.model('pricerules',priceRulesSchema);

module.exports = priceRules;

