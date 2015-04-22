var express = require('express');
var ProductController = express();
var Product = require('../models/products.js');
var bodyParser = require('body-parser');

ProductController.use(bodyParser());


// All Active Products
ProductController.get('/',function(req,res){
	Product.find({"is_active":true},function(err,products){
		res.status(200).json({'activeProducts':products});
	});
});

// Retrieve Products by category name

ProductController.get('/category/:name',function(req,res){
	var categoryName = req.params.name;

	Product.find({"category":categoryName,"is_active":true},function(err,products){
		res.status(200).json({'activeProducts':products});
	});
});

// Create new Product 

ProductController.put('/product/',function(req,res){

	var product = new Product({
		category:req.body.category,
		name:req.body.name,	
		type:req.body.type,
		description:req.body.description,
		emailAddress:req.body.emailAddress,
		is_active:req.body.is_active,
		addresses:[],
		phoneNumbers:[],
		tariffs:[],
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
		res.status(200).json({product:product});
	})
});

//Update Product Detail

ProductController.post('/product/:id',function(req,res){

	productToBeUpdated = {
		category:req.body.category,
		name:req.body.name,
		type:req.body.type,
		description:req.body.description,
		emailAddress:req.body.emailAddress,
		is_active:req.body.is_active
	};

	Product.findOneAndUpdate({_id:req.params.id},productToBeUpdated,{upsert:true},function(err,product){
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



// List All Addresses 

ProductController.get('/:id/addresses',function(req,res){
	productId = req.params.id;
	Product.findOne({_id:productId},'addresses',function(err,product){
		if(err) return res.send(500,'Error Occured During Adddress Retrieval for Product with Id['+productId+']');
		res.status(200).json({'addresses':product.addresses});

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
		cost:req.body.cost
	};

	Product.update({_id:productId},{
		$push:
			{'tariffs':
					newTariff
			}
		},
		{upsert:true},function(err){
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
		{upsert:true},function(err){
			if(err) return res.send(500,'Error Occured During Phone Update for Product with Id['+productId+']');
			res.json({'status':'New Phone Details Created for Product ['+productId+']'});
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

// Delete Address

ProductController.delete('/:productId/address/:addressId',function(req,res){
	productId = req.params.productId;
	addressId = req.params.addressId;

	console.log("Address Delete Invoked ...");

	Product.update({_id:productId},
	{
		$pull:{addresses:{_id:addressId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During Address Delete for Product with Id['+productId+']');
				res.json({'status':'Address Deleted for Product ['+productId+']'});
	});
});


// Delete TermsAndCondition

ProductController.delete('/:productId/termsAndCondition/:termsConditionId',function(req,res){
	productId = req.params.productId;
	termsConditionId = req.params.termsConditionId;

	console.log("TermsCondition Delete Invoked ...");

	Product.update({_id:productId},
	{
		$pull:{termsAndConditions:{_id:termsConditionId}}
	},{multi:true}
		,function(err){
				if(err) return res.send(500,'Error Occured During TermsCondition Delete for Product with Id['+productId+']');
				res.json({'status':'TermsCondition Deleted for Product ['+productId+']'});
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

// TODO : Include Update of address/tariff/phoneNumber/amenity/termsCondition

//TODO : search specific params ..


module.exports = ProductController;
