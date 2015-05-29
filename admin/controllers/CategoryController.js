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
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var gfs = Grid(mongoose.connection.db, mongoose.mongo);
var dirname = require('path').dirname(__dirname);
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
  /*if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }*/
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
                    
                    
                    var filename = req.files.imageUrl.name;
                    var path = req.files.imageUrl.path;
                    var type = req.files.imageUrl.mimetype;
                    var read_stream =  fs.createReadStream(dirname + '/' + path);                    
                    var writestream = gfs.createWriteStream({
                        filename: req.files.imageUrl.name
                    });
                    read_stream.pipe(writestream);
                    console.log('gridfs uploaded'+req.files.imageUrl.name);
                

            
                
            
                res.redirect('/categories/list');
            

        });
    }
    
});

//Update the category
CategoryController.post('/category/:id',function(req,res){
    
	categoryToBeUpdated = {
		name:req.body.name,
		description:req.body.description,
		imageUrl:imageName,
		cssClass:req.body.cssClass,
		is_active:req.body.isActive
	};

	console.log('Category Updated for id '+req.body.name);
    
    if(req.body.prevImgUrl != "undefined" || req.body.prevImgUrl != ""){
        try{
        fs.unlink('uploads/'+req.body.prevImgUrl, function (err) {
          if (err) throw err;
          console.log('successfully deleted '+req.body.prevImgUrl);
        });
        
        gfs.remove({filename:req.body.prevImgUrl}, function (err) {
          if (err) return handleError(err);
          console.log('success');
        });
        }
        catch(e){
            console.log("something went wrong");   
        }
    }

	Categories.findOneAndUpdate({_id:req.params.id},categoryToBeUpdated,{upsert:false},function(err,category){
		if(err) return res.send(500,'Error Occured: database error during Category Updation');
		//res.json({'status':'Category '+category._id+' Updated '});
        backUrl = '/categories/category/'+req.params.id;
        var filename = req.files.imageUrl.name;
        var path = req.files.imageUrl.path;
        var type = req.files.imageUrl.mimetype;
        var read_stream =  fs.createReadStream(dirname + '/' + path);                    
        var writestream = gfs.createWriteStream({
            filename: req.files.imageUrl.name
        });
        read_stream.pipe(writestream);
        console.log('gridfs uploaded'+req.files.imageUrl.name);
        res.redirect(backUrl); 
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
            gfs.remove({filename:req.params.imgUrl}, function (err) {
              if (err) return handleError(err);
              console.log('success');
            });
        }
        res.status(200).json({'status':'Category '+req.params.id +' Deleted'});
        
        });
});


module.exports = CategoryController;
