var express = require('express');
var ProductController = express();
var Product = require('../models/products.js');
var ClassificationGroup = require('../models/classification.js');
var facilitiesGroup = require('../models/facilitiesGroup.js');
var facilities = require('../models/facilities.js');
var priceRules = require('../models/pricerules.js');
var priceRules = require('../models/pricerules.js');
var Countries = require('../models/countries.js');
var States = require('../models/states.js');
var tax = require('../models/tax.js');
var bodyParser = require('body-parser');

ProductController.use(bodyParser());
var multer = require('multer');
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
ProductController.use(bodyParser());
ProductController.use(cookieParser());
ProductController.use(expressSession({ secret: '1234QWERTY'}));
ProductController.use(Passport.initialize());
ProductController.use(Passport.session());
ProductController.use(flash());

/*File uplaod*/
/*CategoryController.use(multer({ dest: './uploads/',
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
}));*/




// All Active Products
ProductController.get('/',function(req,res){
	Product.find({"is_active":true},function(err,products){
		res.status(200).json({'data':products});
	});
});

// Retrieve Products by category name

ProductController.get('/category/:name',function(req,res){
	var categoryName = req.params.name;

	Product.find({"category":categoryName,"is_active":true},function(err,products){
		res.status(200).json({'data':products});
	}).sort( { _id: -1 } );
});

// Create new Product

ProductController.put('/product/',function(req,res){
    var classification = req.body.classification;
    var classificationArray = [];
    //var classificationArray = classification.split(",");
    if(typeof(classification) == 'string'){
        classificationArray.push({"name":classification});
    }
    else{
        classification.forEach(function(item){
            classificationArray.push({"name":item});
        });
    }
    console.log(classificationArray);
	var product = new Product({
		category:req.body.category,
		actualName:req.body.actualName,
		name:req.body.name,
		type:req.body.type,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        routeTips:req.body.routeTips,
        starRating:req.body.starRating,
		description:req.body.description,
		emailAddress:req.body.emailAddress,
		is_active:req.body.is_active,
    images:[],
		addresses:[],
		phoneNumbers:[],
		facilities:[],
    classifications:classificationArray,
		packages:[],
		amenities:[],
		termsAndConditions:[]
	});
	product.save(function(err,a){
		if(err) return res.send(500,'Error Occured: database error');
		res.json({'status':'Product '+a._id+' Created '});
	});

});

// List Product Detail

ProductController.get('/product/:id',function(req,res){
	Product.findById(req.params.id,function(err,product){
		if(req.session.passport.user){
            
            facilities.find({},function(err,facilitiesByGroup){                
                priceRules.find({},function(err,priceRule){                        
                    tax.find({},function(err,taxByType){
                        console.log("state: "+product.state);
                        States.find({stateCode: product.state}, function(err, st) {
                            console.log(st[0].stateName);
                            res.render("product-view",{'product':product, 'stateName': st[0].stateName, 'pricerules':priceRule,'facilities':facilitiesByGroup,'taxes':taxByType,layout:'list'});
                        });
                    });
                });
            }); 
        }
            
            //res.status(200).json({product:product});
        else {
            res.redirect('/account/session');
        }
        //res.status(200).json({product:product});

	})
});

//Update product details
ProductController.get('/productDetails/:id',function(req,res){
	Product.findById(req.params.id,function(err,product){
		if(req.session.passport.user) {
            Countries.find({},function(err,countries){
                res.render("update-product-details",{'product':product,'countries':countries,layout:'list'});
            });
        
        } else {
            res.redirect('/account/session');
        }
        //res.status(200).json({product:product});

	})
});

//Create new Image
ProductController.get('/:productId/:source/add-new-image',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        destName = req.params.source;
        res.render("add-new-image",{'productId':prodId,'dest':destName,layout:'list'});
	})
});

//Create new Address
ProductController.get('/:productId/add-new-address',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        States.find({},function(err,states){
            res.render("add-new-address",{'productId':prodId,'states':states,layout:'list'});
        });
	})
});

//Create new tariff
ProductController.get('/:productId/add-new-tariff',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        res.render("add-new-tariff",{'productId':prodId,layout:'list'});
	})
});

//Create new Amenity
ProductController.get('/:productId/add-new-amenity',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        res.render("add-new-amenity",{'productId':prodId,layout:'list'});
	})
});

//Create new termsAndConditions
ProductController.get('/:productId/add-new-termsAndConditions',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        res.render("add-new-termsAndConditions",{'productId':prodId,layout:'list'});
	})
});
//Create new facility
ProductController.get('/:productId/add-new-facility',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        res.render("add-new-facility",{'productId':prodId,layout:'list'});
	})
});
//Create new phonenumber
ProductController.get('/:productId/add-new-phoneNumber',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        res.render("add-new-phoneNumber",{'productId':prodId,layout:'list'});
	})
});

//Get the address details
ProductController.get('/:productId/add-edit-address/:addressId',function(req,res){
    productId = req.param.productId;
	Product.findOne({_id:productId},'addresses',function(err,product){
		if(err) return res.send(500,'Error Occured During Adddress Retrieval for Product with Id['+productId+']');
		//res.status(200).json({'addresses':product.addresses});
        res.render("update-addresses",{'addresses':product.addresses,layout:'list'});

	});
});

//Update Product Detail

ProductController.post('/product/:id',function(req,res){

	productToBeUpdated = {
		actualName:req.body.actualName,
		name:req.body.name,
		type:req.body.type,
		description:req.body.description,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        routeTips:req.body.routeTips,
        starRating:req.body.starRating,
		emailAddress:req.body.emailAddress,
		is_active:req.body.is_active
	};

	Product.findOneAndUpdate({_id:req.params.id},productToBeUpdated,{upsert:false},function(err,product){
		if(err) return res.send(500,'Error Occured: database error during Product Updation');
		res.json({'status':'Product '+product._id+' Updated '});

	});
});


// Delete Product By Id

ProductController.delete('/product/:id',function(req,res){
	Product.findById(req.params.id,function(err,product){
		if(err)return res.send(500,'Error Occured:database error'+err);
		product.remove();
		res.status(200).json({'status':'Product '+req.params.id +' Deleted'});
	});
});

//Get Address By Product ID & Address ID

ProductController.get('/:productId/addresses/:addressId',function(req,res){
	productId = req.params.productId;
	addressId = req.params.addressId;

	Product.find(
		{_id:productId},
		{addresses:{$elemMatch:
			{
				_id:addressId
			}
		}
		},
		function(err,product){
		res.render("update-address",{'productAddress':product[0].addresses[0],'productId':productId,layout:'list'});
	});

});
//Get image By Product ID & Address ID

ProductController.get('/:productId/image/:imageId/:source',function(req,res){
	productId = req.params.productId;
	imageId = req.params.imageId;
    dest = req.params.source;
    console.log(productId);
	Product.find(
		{_id:productId},
		{images:{$elemMatch:
			{
				_id:imageId
			}
		  }
		},
		function(err,product){
        //res.status(200).json({product:product});
		res.render("update-image",{'productImage':product[0].images[0],'productId':productId,'dest':dest,layout:'list'});
	});

});

//Get tariff By Product ID & Tariff ID
ProductController.get('/:productId/tariff/:tariffId/:page',function(req,res){
	productId = req.params.productId;
	tariffId = req.params.tariffId;

	Product.find(
		{_id:productId},
		{tariffs:{$elemMatch:
			{
				_id:tariffId
			}
		}
	},{
		sort:{"tariffs._id" : -1}
	},
		function(err,product){
			if(req.params.page == "tariff-view"){
				res.render("tariff-view",{'productTariff':product[0].tariffs[0],'productId':productId,layout:'list'});
			}	else if(req.params.page == "tariff-update"){
				res.render("update-tariff",{'productTariff':product[0].tariffs[0],'productId':productId,layout:'list'});
			}
	});
});



//Get Amenities By Product ID & Amenities ID

ProductController.get('/:productId/amenity/:amenityId',function(req,res){
	productId = req.params.productId;
	amenityId = req.params.amenityId;

	Product.find(
		{_id:productId},
		{amenities:{$elemMatch:
			{
				_id:amenityId
			}
		}
		},
		function(err,product){
		res.render("update-amenity",{'productAmenities':product[0].amenities[0],'productId':productId,layout:'list'});
	});

});

//Get TermsAndConditions By Product ID & termandcondition ID

ProductController.get('/:productId/termsAndConditions/:amenityId',function(req,res){
	productId = req.params.productId;
	termsAndConditionsId = req.params.amenityId;

	Product.find(
		{_id:productId},
		{termsAndConditions:{$elemMatch:
			{
				_id:termsAndConditionsId
			}
		}
		},
		function(err,product){
		res.render("update-termsAndConditions",{'producttermsAndConditions':product[0].termsAndConditions[0],'productId':productId,layout:'list'});
	});

});

//Get Phone Number By Product ID & Phone ID

ProductController.get('/:productId/phone/:phoneId',function(req,res){
	productId = req.params.productId;
	phoneId = req.params.phoneId;

	Product.find(
		{_id:productId},
		{phoneNumbers:{$elemMatch:
			{
				_id:phoneId
			}
		}
		},
		function(err,product){
		res.render("update-phone",{'productPhone':product[0].phoneNumbers[0],'productId':productId,layout:'list'});
	});

});


//Get facilities By Product ID & facility ID

ProductController.get('/:productId/facility/:facilityId',function(req,res){
	productId = req.params.productId;
	facilityId = req.params.facilityId;

	Product.find(
		{_id:productId},
		{facilities:{$elemMatch:
			{
				_id:facilityId
			}
		}
		},
		function(err,product){
		res.render("update-facility",{'productFacility':product[0].facilities[0],'productId':productId,layout:'list'});
	});

});
// List All Addresses

ProductController.get('/:id/addresses',function(req,res){
	productId = req.params.id;
	Product.findOne({_id:productId},'addresses',function(err,product){
		if(err) return res.send(500,'Error Occured During Adddress Retrieval for Product with Id['+productId+']');
		res.status(200).json({'addresses':product.addresses});
        //res.render("update-addresses",{'addresses':product.addresses,layout:'list'});

	});
});

// List All PhoneNumbers

ProductController.get('/:id/phoneNumbers',function(req,res){
	productId = req.params.id;
	Product.findOne({_id:productId},'phoneNumbers',function(err,product){
		if(err) return res.send(500,'Error Occured During PhoneNumbers Retrieval for Product with Id['+productId+']');
		res.status(200).json({'phoneNumbers':product.phoneNumbers});

	});
});

// List All Tariffs

ProductController.get('/:id/tariffs',function(req,res){
	productId = req.params.id;
	Product.findOne({_id:productId},'tariffs',function(err,product){
		if(err) return res.send(500,'Error Occured During Tariffs Retrieval for Product with Id['+productId+']');
		res.status(200).json({'tariffs':product.tariffs});

	});
});

// List All Amenities

ProductController.get('/:id/amenities',function(req,res){
	productId = req.params.id;
	Product.findOne({_id:productId},'amenities',function(err,product){
		if(err) return res.send(500,'Error Occured During Amenities Retrieval for Product with Id['+productId+']');
		res.status(200).json({'amenities':product.amenities});

	});
});

// List All TermsAndConditions

ProductController.get('/:id/termsAndConditions',function(req,res){
	productId = req.params.id;
	Product.findOne({_id:productId},'termsAndConditions',function(err,product){
		if(err) return res.send(500,'Error Occured During TermsAndConditions Retrieval for Product with Id['+productId+']');
		res.status(200).json({'termsAndConditions':product.termsAndConditions});

	});
});


// Add TermsAndConditions

ProductController.post('/:id/termsconditions',function(req,res){
	productId = req.params.id;
	newTermsCondition={
		description:req.body.description,
	};

	Product.update({_id:productId},{
		$push:
			{'termsAndConditions':
					newTermsCondition
			}
		},
		{upsert:true},function(err){
			if(err) return res.send(500,'Error Occured During Terms & Conditions Update for Product with Id['+productId+']');
			res.json({'status':'New Terms & Conditions Details Created for Product ['+productId+']'});
		});
});


// Add Amenities

ProductController.post('/:id/amenity',function(req,res){
	productId = req.params.id;
	newAmenity={
		description:req.body.description,
	};

	Product.update({_id:productId},{
		$push:
			{'amenities':
					newAmenity
			}
		},
		{upsert:true},function(err){
			if(err) return res.send(500,'Error Occured During Amenity Update for Product with Id['+productId+']');
			res.json({'status':'New Amenity Details Created for Product ['+productId+']'});
		});
});




// Add Tarriffs

ProductController.post('/:id/tariff',function(req,res){
	productId = req.params.id;
	newTariff={
		description:req.body.description,
		displayedCost:req.body.displayedCost,
        netCost:req.body.netCost,
        tax:[]

	};

	Product.update({_id:productId},{
		$push:
			{'tariffs':
					newTariff
			}
		},
		{upsert:true},function(err,tariff){
			if(err) return res.send(500,'Error Occured During Tariff Update for Product with Id['+productId+']');
			res.json({'status':'New Tariff Details Created for Product ['+productId+']'});
		});
});



// Add PhoneNumbers

ProductController.post('/:id/phone',function(req,res){
	productId = req.params.id;
	newPhoneNumber={
		contactType:req.body.contactType,
		contactNumber:req.body.contactNumber
	};

	Product.update({_id:productId},{
		$push:
			{'phoneNumbers':
					newPhoneNumber
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During Phone Update for Product with Id['+productId+']');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
		});
});


// Add facilities

ProductController.post('/:id/facility/:facilityId',function(req,res){
	productId = req.params.id;
    var facilityObject = {'facilityId':req.params.facilityId};
    console.log("Adding facility invoked for "+req.params.facilityId);	
	Product.update({_id:productId},{
		$push:
			{'facilities':
					facilityObject
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During Phone Update for Product with Id['+productId+']');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
		});
});

// Add tax

ProductController.post('/:id/tax/:taxId',function(req,res){
	productId = req.params.id;
    var taxObject = {'taxId':req.params.taxId};
    console.log("Adding tax invoked for "+req.params.taxId);	
	Product.update({_id:productId},{
		$push:
			{'taxes':
					taxObject
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During Phone Update for Product with Id['+productId+']');
			res.json({'status':'New tax Details Created for Product ['+productId+']'});
		});
});
// Add Address

ProductController.post('/:id/address',function(req,res){
	productId = req.params.id;
	newAddress = {
		address1 :req.body.address1,
		address2 : req.body.address2,
		city : req.body.city,
		state :req.body.state,
		postalCode : req.body.postalCode
	};

	Product.update({_id:productId},
		{
			$push:{'addresses':
					newAddress
				}}
				,{upsert:true}
		,function(err){
		if(err) return res.send(500,'Error Occured During Address Update for Product with Id['+productId+']');
		res.json({'status':'Address Created for Product ['+productId+']'});
	});
});

// Add Image

ProductController.post('/:id/:source/image',multer({
    dest:"./uploads/",
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    changeDest:function(dest,req,res){
        var newDestination = dest + req.params.source;
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        return newDestination
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.name);
        imageName = file.name;
      done=true;
    }
}),function(req,res){
	productId = req.params.id;
    captionText = req.body.caption;
    console.log(imageName);
	newImage = {
		imageUrl :imageName,
		captionText:captionText,
        title:req.body.title,
        sortOrder:req.body.sort_order
	};
	Product.update({_id:productId},
		{
			$push:{'images':
					newImage
				}}
				,{upsert:true}
		,function(err){
		if(err) return res.send(500,'Error Occured During Address Update for Product with Id['+productId+']');
		//res.json({'status':'Address Created for Product ['+productId+']'});
        var filename = req.files.imageUrl.name;
        var path = req.files.imageUrl.path;
        var type = req.files.imageUrl.mimetype;
        var read_stream =  fs.createReadStream(dirname + '/' + path);
        var writestream = gfs.createWriteStream({
            filename: req.files.imageUrl.name
        });
        read_stream.pipe(writestream);
        res.redirect("/products/product/"+productId+"?tab=images");
	});
});
// Update Address

ProductController.post('/:productId/address/:addressId',function(req,res){

	productId = req.params.productId;
	addressId = req.params.addressId;

	addressToBeUpdated = {
		address1 :req.body.address1,
		address2 : req.body.address2,
		city : req.body.city,
		state :req.body.state,
		postalCode : req.body.postalCode,
		_id:addressId
	};

	Product.update({_id:productId,'addresses._id':addressId},
		{
			$set:{'addresses.$':addressToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During Address Update for Product with Id['+productId+']'+err);
		res.json({'status':'Address Updated for Product ['+productId+']'});
	});
});

// Update images

ProductController.post('/:productId/image/:imageId/:source',multer({
   dest:"./uploads/",
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    changeDest:function(dest,req,res){
        var newDestination = dest + req.params.source;
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        return newDestination
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.name);
        imageName = file.name;
      done=true;
    }
}),function(req,res){

	productId = req.params.productId;
	imageId = req.params.imageId;
    dest = req.params.source;
    prevUrl = req.body.prevUrl;

    bUrl = "/products/product/"+productId+"?tab=images";
    var fileImage = imageName;

    if(imageName =="" || imageName === undefined){
        imageName = req.body.imgUrl;
    }
	imageToBeUpdated = {
		imageUrl:imageName,
        captionText:req.body.caption,
        title:req.body.title,
        sortOrder:req.body.sort_order,
		_id:imageId
	};
    if(fileImage.trim() != "" && req.body.prevUrl != "" && fileImage.trim() != req.body.prevUrl ){
        try{
        fs.unlink('uploads/'+dest+"/"+prevUrl, function (err) {
          if (err) throw err;
          console.log('successfully deleted '+prevUrl);
        });

        gfs.remove({filename:prevUrl}, function (err) {
          if (err) return handleError(err);
          console.log('success');
        });
        }
        catch(e){
            console.log("something went wrong");
        }
    }

	Product.update({_id:productId,'images._id':imageId},
		{
			$set:{'images.$':imageToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During Address Update for Product with Id['+productId+']'+err);


        backUrl = '/categories/category/'+req.params.id;
        if(req.files.imageUrl !== undefined){
            var filename = req.files.imageUrl.name;
            var path = req.files.imageUrl.path;
            var type = req.files.imageUrl.mimetype;
            var read_stream =  fs.createReadStream(dirname + '/' + path);
            var writestream = gfs.createWriteStream({
                filename: req.files.imageUrl.name
            });
            read_stream.pipe(writestream);
            console.log('gridfs uploaded'+req.files.imageUrl.name);
        }
        //res.json({'status':'Address Updated for Product ['+productId+']'});
        res.redirect(bUrl);
	});
});


// Delete image

ProductController.delete('/:productId/:dest/image/:imageId/:imageName',function(req,res){
	productId = req.params.productId;
	imageId = req.params.imageId;
    dest = req.params.dest;
    imgaeName = req.params.imageName;

	Product.update({_id:productId},
	{
		$pull:{images:{_id:imageId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During Address Delete for Product with Id['+productId+']');
				res.json({'status':'Address Deleted for Product ['+productId+']'});
                fs.unlink('uploads/'+dest+"/"+imgaeName, function (err) {
                  if (err) throw err;
                  console.log('successfully deleted '+req.body.prevImgUrl);
                });
                gfs.remove({filename:imgaeName}, function (err) {
                  if (err) return handleError(err);
                  console.log('success');
                });

	});
});

// Delete Address

ProductController.delete('/:productId/address/:addressId',function(req,res){
	productId = req.params.productId;
	addressId = req.params.addressId;

	Product.update({_id:productId},
	{
		$pull:{addresses:{_id:addressId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During Address Delete for Product with Id['+productId+']');
				res.json({'status':'Address Deleted for Product ['+productId+']'});
	});
});


// Update TermsAndCondition

ProductController.post('/:productId/termsAndCondition/:termsAndConditionId',function(req,res){

	productId = req.params.productId;
	termsAndConditionId = req.params.termsAndConditionId;

	termsAndConditionToBeUpdated = {
		description:req.body.description,
		_id:termsAndConditionId
	};


	Product.update({_id:productId,'termsAndConditions._id':termsAndConditionId},
		{
			$set:{'termsAndConditions.$':termsAndConditionToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During TermsAndCondition Update for Product with Id['+productId+']'+err);
		res.json({'status':'TermsAndCondition Updated for Product ['+productId+']'});
	});
});

// Delete TermsAndCondition

ProductController.delete('/:productId/termsAndCondition/:termsConditionId',function(req,res){
	productId = req.params.productId;
	termsConditionId = req.params.termsConditionId;

	Product.update({_id:productId},
	{
		$pull:{termsAndConditions:{_id:termsConditionId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During TermsCondition Delete for Product with Id['+productId+']');
				res.json({'status':'TermsCondition Deleted for Product ['+productId+']'});
	});
});

// Update Amenity

ProductController.post('/:productId/amenity/:amenityId',function(req,res){

	productId = req.params.productId;
	amenityId = req.params.amenityId;

	amenityToBeUpdated = {
		description:req.body.description,
		_id:amenityId
	};

	Product.update({_id:productId,'amenities._id':amenityId},
		{
			$set:{'amenities.$':amenityToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During Amenity Update for Product with Id['+productId+']'+err);
		res.json({'status':'Amenity Updated for Product ['+productId+']'});
	});
});


//Delete Amenity

ProductController.delete('/:productId/amenity/:amenityId',function(req,res){
	productId = req.params.productId;
	amenityId = req.params.amenityId;

	console.log("Amenity Delete Invoked ...");

	Product.update({_id:productId},
	{
		$pull:{amenities:{_id:amenityId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During Amenity Delete for Product with Id['+productId+']');
				res.json({'status':'Amenity Deleted for Product ['+productId+']'});
	});
});

// Update Tariff
ProductController.post('/:productId/tariff/:tariffId',function(req,res){

	productId = req.params.productId;
	tariffId = req.params.tariffId;

	tariffToBeUpdated = {
		description:req.body.description,
		cost:req.body.cost,
        tax:req.body.tax,
		_id:tariffId
	};

	Product.update({_id:productId,'tariffs._id':tariffId},
		{
			$set:{'tariffs.$':tariffToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During Tariff Update for Product with Id['+productId+']'+err);
		res.json({'status':'Tariff Updated for Product ['+productId+']'});
	});
});

//Delete Tariff

ProductController.delete('/:productId/tariff/:tariffId',function(req,res){
	productId = req.params.productId;
	tariffId = req.params.tariffId;

	console.log("Tariff Delete Invoked ...");

	Product.update({_id:productId},
	{
		$pull:{tariffs:{_id:tariffId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During Tariff Delete for Product with Id['+productId+']');
				res.json({'status':'Tariff Deleted for Product ['+productId+']'});
	});
});


// Update PhoneNumber

ProductController.post('/:productId/phoneNumber/:phoneNumberId',function(req,res){

	productId = req.params.productId;
	phoneNumberId = req.params.phoneNumberId;

	phoneNumberToBeUpdated = {
		contactType:req.body.contactType,
		contactNumber:req.body.contactNumber,
		_id:phoneNumberId
	};

	Product.update({_id:productId,'phoneNumbers._id':phoneNumberId},
		{
			$set:{'phoneNumbers.$':phoneNumberToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During PhoneNumber Update for Product with Id['+productId+']'+err);
		res.json({'status':'PhoneNumber Updated for Product ['+productId+']'});
	});
});

// Update facilities

ProductController.post('/:productId/facility/:facilityId',function(req,res){

	productId = req.params.productId;
	facilityId = req.params.facilityId;

	facilityToBeUpdated = {
		facilityType:req.body.facilityType,
		facilityDescription:req.body.facilityDescription,
		_id:facilityId
	};

	Product.update({_id:productId,'facilities._id':facilityId},
		{
			$set:{'facilities.$':facilityToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During PhoneNumber Update for Product with Id['+productId+']'+err);
		console.log("facilityDesc:"+req.body.facilityDescription);
		res.json({'status':'PhoneNumber Updated for Product ['+productId+']'});
	});
});

//Delete Facilities

ProductController.delete('/:productId/facilities/:facilityId',function(req,res){
	productId = req.params.productId;
	facilityId = req.params.facilityId;

	console.log("facility Delete Invoked for..."+facilityId);

	Product.update({_id : productId},
	{
		$pull:{facilities:{facilityId : facilityId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During PhoneNumber Delete for Product with Id['+productId+']');
				res.json({'status':'PhoneNumber Deleted for Product ['+productId+']'});
	});
});
//Delete tax
ProductController.delete('/:productId/tax/:taxId',function(req,res){
	productId = req.params.productId;
	taxId = req.params.taxId;

	console.log("facility Delete Invoked for..."+taxId);

	Product.update({_id : productId},
	{
		$pull:{taxes:{taxId : taxId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During Tax Delete for Product with Id['+productId+']');
				res.json({'status':'Tax Deleted for Product ['+productId+']'});
	});
});
//Delete PhoneNumber

ProductController.delete('/:productId/phoneNumber/:phoneNumberId',function(req,res){
	productId = req.params.productId;
	phoneNumberId = req.params.phoneNumberId;

	console.log("PhoneNumber Delete Invoked ...");

	Product.update({_id:productId},
	{
		$pull:{phoneNumbers:{_id:phoneNumberId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During PhoneNumber Delete for Product with Id['+productId+']');
				res.json({'status':'PhoneNumber Deleted for Product ['+productId+']'});
	});
});
//Add new classification for product
ProductController.get('/:productId/classification',function(req,res){
    var productId = req.params.productId;
	ClassificationGroup.find({'is_active':true},function(err,classifications){
		res.render("add-product-classification",{'classifications':classifications,'productId':productId,layout:'list'});
    });
});

//add new classification
ProductController.post('/:id/classification',function(req,res){
    var productId = req.params.id;
    var classificationName = req.body.classification;
    newClassification={
		name:classificationName
	};
    Product.findOne({_id:productId},{classifications:{$elemMatch:{name:classificationName}}},function(err,prodClass){
        if(err) {
            return res.send(500,'Error Occured During Phone Update for Product with Id['+productId+']');
        }
        else{
            if(prodClass.classifications != ""){
                //res.json({"msg":prodClass.classification});
                ClassificationGroup.find({'is_active':true},function(err,classifications){
                    res.json({"msg":"Already classification added for this product"});
                    //res.render("add-category-classification",{msg:"Aleready classification added for this category",'classifications':classifications,'productId':productId,layout:'list'});
                });

            }
            else{
            Product.update({_id:productId},{
            $push:
                {'classifications':
                        newClassification
                }
            },
            {upsert:false},function(err){
                if(err) return res.send(500,'Error Occured During Phone Update for Product with Id['+productId+']');
                //res.json({'status':'New Phone Details Created for Product ['+categoryId+']'});
                res.redirect("/products/product/"+productId);
            });
            }
        }
    });

});

// Delete classification

ProductController.delete('/:productId/productclassification/:classId',function(req,res){
	productId = req.params.productId;
	classId = req.params.classId;

	Product.update({_id:productId},
	{
		$pull:{classifications:{_id:classId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During TermsCondition Delete for Product with Id['+productId+']');
				res.json({'status':'TermsCondition Deleted for Product ['+productId+']'});
	});
});

// Delete packages

ProductController.delete('/:productId/productPackages/:packageId',function(req,res){
	productId = req.params.productId;
	packageId = req.params.packageId;

	Product.update({_id:productId},
	{
		$pull:{packages:{_id:packageId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During Package Delete for Product with Id['+productId+']');
				res.json({'status':'Package Deleted for Product ['+productId+']'});
	});
});


/*// Add tariff package details
ProductController.post('/:id/:tariffId/taxdetails',function(req,res){
	productId = req.params.id;
	tariffId = req.params.tariffId;
	newTaxDetails={
		taxType:req.body.taxType,
		percentage:req.body.percentage,
		amount:req.body.amount
	};
	//console.log("taxType"+req.body.taxType+"percentage:"+req.body.percentage+"Amount:"+req.body.amount);
	Product.update({_id:productId,'tariffs._id':tariffId},{
		$push:
			{'tariffs.$.tax':
            newTaxDetails
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During tariff tax Update for Product with Id['+productId+']'+err);
			console.log('Tax added');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
		});
});*/
// Add tax details
ProductController.post('/:id/:tariffId/taxdetails',function(req,res){
	productId = req.params.id;
	tariffId = req.params.tariffId;
	newTaxDetails={
		taxType:req.body.taxType,
		percentage:req.body.percentage,
		amount:req.body.amount
	};
	//console.log("taxType"+req.body.taxType+"percentage:"+req.body.percentage+"Amount:"+req.body.amount);
	Product.update({_id:productId,'tariffs._id':tariffId},{
		$push:
			{'tariffs.$.tax':
            newTaxDetails
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During tariff tax Update for Product with Id['+productId+']'+err);
			console.log('Tax added');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
		});
});
//update tarrif tax
ProductController.post('/:productId/updateTaxTariff/:tariffId/:taxId',function(req,res){

	productId = req.params.productId;
	tariffId = req.params.tariffId;
    taxId = req.params.taxId;

	taxToBeUpdated = {
		taxType:req.body.taxType,
		percentage:req.body.percentage,
        amount:req.body.amount,
		_id:taxId
	};

	Product.update({_id:productId,'tariffs._id':tariffId},
		{
			$set:{'tariffs.$.tax.$':taxToBeUpdated}}
		,function(err){
		if(err) return res.send(500,'Error Occured During PhoneNumber Update for Product with Id['+productId+']'+err);
		
		res.json({'status':'tax Updated for Product ['+productId+']'});
	});
});

//Delete tariff tax
ProductController.delete('/:productId/tariff/:tariffId/:tariffTaxId',function(req,res){
	productId = req.params.productId;
	tariffId = req.params.tariffTaxId;
	tariffTaxId = req.params.tariffTaxId;


	//console.log("productId:"+productId+"tariffId:"+tariffId+"tariffTaxId:"+tariffTaxId);
	Product.update({_id:productId,"tariffs._id":tariffId},
	{
		$pull:{"tariffs.$.tax":{_id:tariffTaxId}}
	},{multi:true},function(err){
				if(err) return res.send(500,'Error Occured During PhoneNumber Delete for Product with Id['+productId+']');
				res.json({'status':'tax Deleted for Product ['+productId+']'});
	});
	console.log("tax Delete Invoked ...");
});

// Add gender price rule details
ProductController.post('/:id/:tariffId/genderPriceRules',function(req,res){
	productId = req.params.id;
	tariffId = req.params.tariffId;
	newGenderRules={
		gender:req.body.gender,
		amount:req.body.amount,
		applicableAmount:req.body.applicableAmount,
		remarks:req.body.remarksText
	};
	//console.log("taxType"+req.body.taxType+"percentage:"+req.body.percentage+"Amount:"+req.body.amount);
	Product.update({_id:productId,'tariffs._id':tariffId},{
		$push:
			{'tariffs.$.genderPriceRules':
            newGenderRules
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During tariff tax Update for Product with Id['+productId+']'+err);
			console.log('gender rules added');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
		});
});

// Add priceRules details
ProductController.post('/:id/:tariffId/priceRules',function(req,res){
	productId = req.params.id;
	tariffId = req.params.tariffId;
	newPriceRules={
		displayedCostOverride:req.body.displayedCostOverride,
		startDate:req.body.startDate,
		endDate:req.body.endDate
	};
	//console.log("taxType"+req.body.taxType+"percentage:"+req.body.percentage+"Amount:"+req.body.amount);
	Product.update({_id:productId,'tariffs._id':tariffId},{
		$push:
			{'tariffs.$.priceOverrides':
            newPriceRules
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During tariff tax Update for Product with Id['+productId+']'+err);
			console.log('Tax added');
			res.json({'status':'New price rules Created for Product ['+productId+']'});
		});
});

// Add tariff package details
ProductController.post('/tariff/addPackage/:id',function(req,res){
	productId = req.params.id;
    var pricerules = req.body.pricerules;
    
	var newPackageDetails={
		title:req.body.title,
		description:req.body.description,
		cost:req.body.cost
	};
	//console.log("taxType"+req.body.taxType+"percentage:"+req.body.percentage+"Amount:"+req.body.amount);
	Product.update({_id:productId},{
		$push:
			{'packages':
                newPackageDetails
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During tariff tax Update for Product with Id['+productId+']'+err);
			console.log('price rule added');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
		});
});
//Get tariff package By Product ID & package ID
ProductController.get('/package-view/:productId/:packageId',function(req,res){
	var productId = req.params.productId;
	var packageId = req.params.packageId;
    console.log("productId:"+productId +"packageId:"+packageId);
	Product.findById(
		{_id:productId},
		{"packages":{$elemMatch:
			{
				"_id":packageId
			}
		}
	},
		function(err,product){
            priceRules.find({},function(err,priceRule){		
                res.render("package-view",{'priceRuleList':priceRule,'productPackage':product.packages[0],'productId':productId,layout:'list'});
            });
			
	});
});
//update tarrif packages
ProductController.post('/packages/updatepackagetraiff/:id/:packageId',function(req,res){

	var productId = req.params.id;
    var packageId = req.params.packageId;
    
	var PackageToBeUpdated={
		title:req.body.title,
		description:req.body.description,
		cost:req.body.cost,
        _id:packageId
	};
	Product.update({_id:productId,"packages._id":packageId},
		{
			$set:{'packages.$':PackageToBeUpdated}},function(err){
                console.log("error"+err);
		      if(err) return res.status(500).send('Error Occured During Package Update for Product with Id['+productId+']'+err);
		
		      res.json({'status':'Package Updated for Product ['+productId+']'});
	});
});

// Associate package price rules details
ProductController.post('/packages/addpricerule/:id/:packageId/:priceRuleId',function(req,res){
	var productId = req.params.id;
	var packageId = req.params.packageId;
	var priceRuleId = req.params.priceRuleId;
	var newPriceRule={
		priceRuleId:priceRuleId
	};
	//console.log("taxType"+req.body.taxType+"percentage:"+req.body.percentage+"Amount:"+req.body.amount);
	Product.update({_id:productId,'packages._id':packageId},{
		$push:
			{'packages.$.pricerules':
            newPriceRule
			}
		},
		{upsert:false},function(err){
			if(err) return res.send(500,'Error Occured During tariff tax Update for Product with Id['+productId+']'+err);
			console.log('Tax added');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
		});
});

//update package price rule
ProductController.delete('/packages/updatepricerule/:id/:packageId/:priceRuleId',function(req,res){
	var productId = req.params.id;
	var packageId = req.params.packageId;
	var priceRuleId = req.params.priceRuleId;


	//console.log("productId:"+productId+"tariffId:"+tariffId+"tariffTaxId:"+tariffTaxId);
	Product.update({_id:productId,'packages._id':packageId},
	{
		$pull:{"packages.$.pricerules":{priceRuleId:priceRuleId}}
	},function(err){
				if(err) return res.send(500,'Error Occured During PhoneNumber Delete for Product with Id['+productId+']');
				res.json({'status':'tax Deleted for Product ['+productId+']'});
	});
	console.log("tax Delete Invoked ...packageId:"+packageId + "priceRuleId:"+priceRuleId);
});
//TODO : search specific params ..


module.exports = ProductController;
