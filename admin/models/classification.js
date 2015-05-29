var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration 

mongoose.connect('mongodb://localhost/vacayplanner');

var classificationSchema = mongoose.Schema({
	name:String,
	description:String,
	is_active:Boolean
});

var ClassificationGroup = mongoose.model('classificationgroups',classificationSchema);

module.exports = ClassificationGroup;

