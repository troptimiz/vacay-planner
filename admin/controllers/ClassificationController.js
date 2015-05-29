var express = require('express');
var ClassificationGroup = require('../models/classification.js');
var bodyParser = require('body-parser');

var ClassificationController = express();


ClassificationController.use(bodyParser());


// All Active Classification
ClassificationController.get('/',function(req,res){
	ClassificationGroup.find({'is_active':true},function(err,classifications){
		res.status(200).json({'classifications':classifications});

	});
});

// All  Classification includes Inactive
ClassificationController.get('/all',function(req,res){
	ClassificationGroup.find({},function(err,classifications){
		res.status(200).json({'classifications':classifications});

	});
});

// Find Classification By Id

ClassificationController.get('/classification/:id',function(req,res){
	var classificationGroupId = req.params.id;
	ClassificationGroup.findById(classificationGroupId,function(err,classification){
        res.status(200).json({"classification":classification});
	})
});

// Delete Classification By Id

ClassificationController.delete('/classification/:id',function(req,res){
	ClassificationGroup.findById(req.params.id,function(err,classification){
		if(err)return res.send(500,'Error Occured:database error'+err);
		classification.remove();
		res.status(200).json({'status':'ClassificationGroup '+req.params.id +' Deleted'});
	});
});

// Create new ClassificationGroup 

ClassificationController.put('/classification/',function(req,res){

	var classificationGroup = new ClassificationGroup({
		name:req.body.groupName,
		description:req.body.groupDescription,	
		is_active:req.body.isActive
	});
	classificationGroup.save(function(err,a){
		if(err) return res.send(500,'Error Occured: database error');
		res.json({'status':'ClassificationGroup '+a._id+' Created '});
	});

});


module.exports = ClassificationController;