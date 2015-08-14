var mongoose =require('mongoose');


//mongoose.connect('mongodb://localhost/vacayplanner');

// Just Creating new connections
var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);

var productSchema = mongoose.Schema({
	type:String,
	category:String,
	name:String,
    city:String,
    state:String,
	description:String,
	emailAddress:String,
	is_active:Boolean,
  images:[{imageUrl:String,captionText:String,title:String,sortOrder:Number}],
	addresses:[{address1:String,address2:String,city:String,state:String,postalCode:Number}],
	phoneNumbers:[{contactType:String,contactNumber:String}],
  facilities:[{facilityType:String,facilityDescription:String}],
  classifications:[{name:String}],
	tariffs:[{description:String,displayedCost:Number,netCost:Number,tax:[{taxType:String,percentage:Number,amount:Number}],genderPriceRules:[{gender:String,amount:Number,applicableAmount:Number,remarks:String}],priceOverrides:[{displayedCostOverride:Number,startDate:String,endDate:String}],currency:{ type: String, default: 'INR' }}],
	amenities:[{description:String}],
	termsAndConditions:[{description:String}]
});

var Product = mongoose.model('products',productSchema);

module.exports = Product;
