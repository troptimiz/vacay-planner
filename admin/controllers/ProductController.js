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


module.exports = ProductController;
