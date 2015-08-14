var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration

var options = {
  db: { native_parser: true },
  server: { poolSize: 2 }
}


mongoose.connect('mongodb://localhost/vacayplanner',options);

var categorySchema = mongoose.Schema({
	name:String,
	description:String,
    short_desc:String,
	imageUrl:String,
	cssClass:String,
    classification:[{name:String}],
	is_active:Boolean
});

var Category = mongoose.model('categories',categorySchema);

module.exports = Category;

