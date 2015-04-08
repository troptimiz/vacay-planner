var express = require('express');
var CategoryController = express();
var Categories = require('../models/categories.js');


CategoryController.get('/',function(req,res){
	Categories.find({'is_active':true},function(err,categories){
		res.status(200).json({activeCategories:categories});
	});	
});


CategoryController.get('/category/:id',function(req,res){
	Categories.findById(req.params.id,function(err,category){
		res.status(200).json({category:category});
	})
});


module.exports = CategoryController;
