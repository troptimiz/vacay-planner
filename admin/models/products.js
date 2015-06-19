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
	description:String,
	emailAddress:String,
	is_active:Boolean,
    images:[{imageUrl:String,captionText:String}],
	addresses:[{address1:String,address2:String,city:String,state:String,postalCode:Number}],
	phoneNumbers:[{contactType:String,contactNumber:Number}],
    classifications:[{name:String}],
	tariffs:[{description:String,cost:Number,currency:{ type: String, default: 'INR' }}],
	amenities:[{description:String}],
	termsAndConditions:[{description:String}]
});

var Product = mongoose.model('products',productSchema);

module.exports = Product;

