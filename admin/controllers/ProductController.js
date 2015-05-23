var express = require('express');
var ProductController = express();
var Product = require('../models/products.js');
var bodyParser = require('body-parser');

ProductController.use(bodyParser());


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
		//res.status(200).json({product:product});
        res.render("product-view",{'product':product,layout:'list'});
	})
});

//Update product details
ProductController.get('/productDetails/:id',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        res.render("update-product-details",{'product':product,layout:'list'});
	})
});

//Create new Address
ProductController.get('/:productId/add-new-address',function(req,res){
	Product.findById(req.params.id,function(err,product){
		//res.status(200).json({product:product});
        prodId = req.params.productId;
        res.render("add-new-address",{'productId':prodId,layout:'list'});
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
		name:req.body.name,
		type:req.body.type,
		description:req.body.description,
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

//Get tariff By Product ID & Tariff ID

ProductController.get('/:productId/tariff/:tariffId',function(req,res){
	productId = req.params.productId;
	tariffId = req.params.tariffId;

	Product.find(
		{_id:productId},
		{tariffs:{$elemMatch:
			{
				_id:tariffId
			}
		}
		},
		function(err,product){
		res.render("update-tariff",{'productTariff':product[0].tariffs[0],'productId':productId,layout:'list'});
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
		{upsert:false},function(err){
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

//TODO : search specific params ..


module.exports = ProductController;