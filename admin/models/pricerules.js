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
	priceRuleType: String,
    genderType:String,
    priceType:String,	
    price:Number,
    eventType:String,
    cancellationType:String,
    duration:Number,
    durationType:String,
    grouplimit: Number,
    startDate:String,
    endDate:String
});

var priceRules = mongoose.model('pricerules',priceRulesSchema);

module.exports = priceRules;

