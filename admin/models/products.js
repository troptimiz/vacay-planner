var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/vacayplanner');

var productSchema = mongoose.Schema({
	name:String,
	description:String,
	imageUrl:String,
	is_active:Boolean,
	parentCategory:String
});

var Product = mongoose.model('products',productSchema);

module.exports = Product;

