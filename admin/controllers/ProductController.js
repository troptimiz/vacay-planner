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


module.exports = ProductController;
