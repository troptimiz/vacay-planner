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
		//res.setHeader('Content-Type', 'application/json');
        //res.status(200).send(JSON.stringify({"classification":classifications},null,3));
        //res.status(200).json({'classifications':classifications});
        res.render("classifications-list",{'activeClassifications':classifications,layout:'list'});

	});
});

// Find Classification By Id

ClassificationController.get('/classification/:id',function(req,res){
	var classificationGroupId = req.params.id;
	ClassificationGroup.findById(classificationGroupId,function(err,classification){
        //res.setHeader('Content-Type', 'application/json');
        //res.status(200).send(JSON.stringify({"classification":classification},null,3));
        res.render("update-classification-form",{'classification':classification,layout:'list'});
        
        
	})
});

//Update the classification
ClassificationController.post('/classification/:id',function(req,res){
    
	classificationToBeUpdated = {
		name:req.body.name,
		description:req.body.description,
		is_active:req.body.isActive
	};    
    console.log(classificationToBeUpdated);
	ClassificationGroup.findOneAndUpdate({_id:req.params.id},classificationToBeUpdated,{upsert:false},function(err,classification){
		if(err) return res.send(500,'Error Occured: database error during Category Updation');
		console.log('Category Updated for id '+req.body.name);
        res.json({'status':'Category '+classification._id+' Updated '});        
        //res.redirect(backUrl); 
	});
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
    
	
    var classificationGroupName = req.body.groupName;
    console.log(classificationGroupName);
	ClassificationGroup.find({name:classificationGroupName},function(err,classification){
        console.log(classification);
        if(err){
            return res.send(500,'Error Occured:database error'+err);
        }
        else{
            if(classification != ""){
                res.json({"msg":"Classification already exist"});                
            }
            else{
                var classificationGroup = new ClassificationGroup({
                    name:req.body.groupName,
                    description:req.body.groupDescription,	
                    is_active:req.body.isActive
                });
                classificationGroup.save(function(err,a){
                    if(err) return res.send(500,'Error Occured: database error');
                    res.json({'status':'ClassificationGroup '+a.name+' Created ',msg:"success"});
                });
            }
        }
        
	})
	

});


module.exports = ClassificationController;