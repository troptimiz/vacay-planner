var express = require('express');
var CategoryController = express();
var Categories = require('../models/categories.js');
var bodyParser = require('body-parser');

CategoryController.use(bodyParser());


// All Active Categories
CategoryController.get('/',function(req,res){
	Categories.find({'is_active':true},function(err,categories){
		res.render("home",{'activeCategories':categories});
		//res.status(200).json({activeCategories:categories});
	});	
});


CategoryController.get('/list',function(req,res){
	Categories.find({},function(err,categories){
		res.render("category-list",{'activeCategories':categories,layout:'list'});
		//res.status(200).json({categories:categories});
	});	
});

// Category Detail using ID
CategoryController.get('/category/:id',function(req,res){
	Categories.findById(req.params.id,function(err,category){
		//res.status(200).json({category:category});
        res.render("add-category-form",{'category':category,layout:'list'});
	})
});

// Create new category
CategoryController.post('/category/',function(req,res){
	var newCategory = new Categories({
		name:req.body.name,
		description:req.body.description,
		// need to see how actual image content can be uploaded ??
		imageUrl:req.body.imageUrl,
		is_active:req.body.isActive

	});
	newCategory.save(function(err,a){
		if(err) return res.send(500,'Error Occured: database error');
		res.json({'status':'Category '+a._id+' Created '});
	});

});

//Update the category
CategoryController.put('/category/', function(req, res) {
    var userToUpdate = req.body.id;
    console.log(userToUpdate);
    Categories.update({ _id: userToUpdate}, {name:req.body.name},{description:req.body.description},{imageUrl:req.body.imageUrl},{cssClass:req.body.cssClass},{is_active:req.body.isActive}, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});


// Delete Category By Id
CategoryController.delete('/category/:id',function(req,res){
	Categories.findById(req.params.id,function(err,category){
		if(err)return res.send(500,'Error Occured:database error'+err);
		category.remove();
		res.status(200).json({'status':'Category '+req.params.id +' Deleted'});
	});
});


module.exports = CategoryController;
