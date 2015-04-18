var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/vacayplanner',function(err){
	console.log('Connection occured while connecting to Mongo'+err);
});

var productSchema = mongoose.Schema({
	type:String,
	category:String,
	name:String,
	description:String,
	emailAddress:String,
	is_active:Boolean,
	addresses:[{address1:String,address2:String,city:String,state:String,postalCode:Number}],
	phoneNumbers:[{type:String,number:Number}],
	tariffs:[{description:String,cost:Number}],
	amenities:[{description:String}],
	termsAndConditions:[{description:String}]
});

var Product = mongoose.model('products',productSchema);

module.exports = Product;

