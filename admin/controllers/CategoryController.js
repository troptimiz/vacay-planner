var express = require('express');
var app = express();
var multer = require('multer');
var done = false;
var CategoryController = express();
var Categories = require('../models/categories.js');
var bodyParser = require('body-parser');
var fs = require('fs');
var imageName ="";
CategoryController.use(bodyParser());

/*File uplaod*/
CategoryController.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.name);
    imageName = file.name;
  done=true;
},
onError: function (error, next) {
  console.log(error)
  next(error)
}
}));
app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});

// All Active Categories
CategoryController.get('/categoryView/:name',function(req,res){
	Categories.find({'is_active':true},function(err,categories){
		res.render("home",{'activeCategories':categories,'name':req.params.name,layout:'list'});
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
	if(done==true){
        var newCategory = new Categories({
            name:req.body.name,
            description:req.body.description,
            // need to see how actual image content can be uploaded ??
            imageUrl:imageName,
            is_active:req.body.isActive

        });
        newCategory.save(function(err,a){
            if(err) return res.send(500,'Error Occured: database error');
            //res.json({'status':'Category '+a._id+' Created '});

                console.log(req.files);
                res.redirect('/categories/list');

        });
    }
    
});

//Update the category
CategoryController.post('/category/:id',function(req,res){

	categoryToBeUpdated = {
		name:req.body.name,
		description:req.body.description,
		imageUrl:req.body.imageUrl,
		cssClass:req.body.cssClass,
		is_active:req.body.isActive
	};

	console.log('Category Updated for id '+req.params.id);

	Categories.findOneAndUpdate({_id:req.params.id},categoryToBeUpdated,{upsert:false},function(err,category){
		if(err) return res.send(500,'Error Occured: database error during Category Updation');
		res.json({'status':'Category '+category._id+' Updated '});

	});
});


// Delete Category By Id
CategoryController.delete('/category/:id/:imgUrl',function(req,res){
	Categories.findById(req.params.id,function(err,category){
		if(err)return res.send(500,'Error Occured:database error'+err);
		console.log("Image URl ********************"+req.params.imgUrl);
        category.remove();
        
        if(req.params.imgUrl != "undefined" || req.params.imgUrl != ""){
            fs.unlink('uploads/'+req.params.imgUrl, function (err) {
              if (err) throw err;
              console.log('successfully deleted '+req.params.imgUrl);
            });
        }
        res.status(200).json({'status':'Category '+req.params.id +' Deleted'});
        
        });
});


module.exports = CategoryController;
