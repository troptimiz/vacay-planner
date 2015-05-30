var express = require('express');
var app = express();
var multer = require('multer');
var done = false;
var CategoryController = express();
var Categories = require('../models/categories.js');
var ClassificationGroup = require('../models/classification.js');
var bodyParser = require('body-parser');
var fs = require('fs');
var imageName ="";

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var gfs = Grid(mongoose.connection.db, mongoose.mongo);
var dirname = require('path').dirname(__dirname);

var Passport = require('passport');
 var flash = require('connect-flash'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var expressSession = require('express-session');
CategoryController.use(bodyParser());
CategoryController.use(cookieParser());
CategoryController.use(expressSession({ secret: '1234QWERTY'}));
CategoryController.use(Passport.initialize());
CategoryController.use(Passport.session());
CategoryController.use(flash());


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
		if(req.session.passport.user)
            res.render("home",{'activeCategories':categories,'name':req.params.name,layout:'list'});
        else
            res.redirect('/account/session');
        
		//res.status(200).json({activeCategories:categories});
	});	
});

CategoryController.get('/list',function(req,res){
	Categories.find({},function(err,categories){
        ClassificationGroup.find({'is_active':true},function(err,classifications){
            if(req.session.passport.user)
                res.render("category-list",{'activeCategories':categories,'activeClassifications':classifications,layout:'list'});
            else
                res.redirect('/account/session');
            
		//res.status(200).json({categories:categories});
        });
	});	
});

// Category Detail using ID
CategoryController.get('/category/:id',function(req,res){
	Categories.findById(req.params.id,function(err,category){
        ClassificationGroup.find({'is_active':true},function(err,classifications){
            //res.status(200).json({category:category});
            if(req.session.passport.user)
                res.render("add-category-form",{'category':category,'activeClassifications':classifications,layout:'list'});
            else
                res.redirect('/account/session');
            
        });
	})
});
CategoryController.get('/categoryDetails/:id',function(req,res){
	Categories.findById(req.params.id,function(err,category){        
		//res.status(200).json({category:category});
        
        if(req.session.passport.user)
            res.render("category-view",{'activeCategories':category,layout:'list'});
        else
            res.redirect('/account/session');
	})
});

// Create new category
CategoryController.post('/category/',function(req,res){
	if(done==true){
        var classification = req.body.classification;
        var classificationArray = [];
        //var classificationArray = classification.split(",");
        classification.forEach(function(item){
            classificationArray.push({"name":item});
        });
        
        var newCategory = new Categories({
            name:req.body.name,
            description:req.body.description,
            // need to see how actual image content can be uploaded ??
            imageUrl:imageName,
            classification:classificationArray,
            is_active:req.body.isActive
        });
        
        //console.log("classigication"+req.body.classification);
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

//Add new classification for category
CategoryController.get('/:categoryId/classification',function(req,res){
    var categoryId = req.params.categoryId;
	ClassificationGroup.find({'is_active':true},function(err,classifications){
		res.render("add-category-classification",{'classifications':classifications,'categoryId':categoryId,layout:'list'});
    }); 
});

//add new classification
CategoryController.post('/:id/classification',function(req,res){
    var categoryId = req.params.id;
    var classificationName = req.body.classification;
	
    newClassification={
		name:req.body.classification
	};
    Categories.findOne({_id:categoryId},{classification:{$elemMatch:{name:classificationName}}},function(err,catClass){
        if(err) {
            return res.send(500,'Error Occured During Phone Update for Product with Id['+categoryId+']');
        }
        else{
            if(catClass.classification != ""){
                //res.json({"msg":catClass.classification});
                ClassificationGroup.find({'is_active':true},function(err,classifications){
                    res.render("add-category-classification",{msg:"Aleready classification added for this category",'classifications':classifications,'categoryId':categoryId,layout:'list'});
                }); 
                
            }
            else{
            Categories.update({_id:categoryId},{
            $push:
                {'classification':
                        newClassification
                }
            },
            {upsert:false},function(err){
                if(err) return res.send(500,'Error Occured During Phone Update for Product with Id['+categoryId+']');
                //res.json({'status':'New Phone Details Created for Product ['+categoryId+']'});
                res.redirect("/categories/categoryDetails/"+categoryId);
            });
            }
        }
    });
	
});
// Delete TermsAndCondition

CategoryController.delete('/:categoryId/classification/:classId',function(req,res){
	categoryId = req.params.categoryId;
	classId = req.params.classId;

	Categories.update({_id:categoryId},
	{
		$pull:{classification:{_id:classId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During TermsCondition Delete for Product with Id['+productId+']');
				res.json({'status':'TermsCondition Deleted for Product ['+categoryId+']'});
	});
});
module.exports = CategoryController;
