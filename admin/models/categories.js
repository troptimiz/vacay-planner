var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/vacayplanner');

var categorySchema = mongoose.Schema({
	name:String,
	description:String,
	imageUrl:String,
	is_active:Boolean
});

var Category = mongoose.model('categories',categorySchema);

module.exports = Category;

