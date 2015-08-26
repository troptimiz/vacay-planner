var express = require('express');
var facilitiesGroup = require('../models/facilitiesGroup.js');
var facilities = require('../models/facilities.js');
var bodyParser = require('body-parser');

var facilitiesGroupsController = express();


facilitiesGroupsController.use(bodyParser());

facilitiesGroupsController.get('/all',function(req,res){
    facilitiesGroup.find({},function(err,facilityGroups){		
        res.render("facility-group-list",{'activeFacilityGroups':facilityGroups,layout:'list'});

	});
});
facilitiesGroupsController.get('/addFacilityGroup',function(req,res){
    res.render('add-new-facility-group',{layout:'list'}); 
});

facilitiesGroupsController.put('/facilitygroup',function(req,res){
    var facilityGroupName = req.body.facilityGroupTitle;
	facilitiesGroup.find({name:facilityGroupName},function(err,facility){
        console.log(facility);
        if(err){
            return res.send(500,'Error Occured:database error'+err);
        }
        else{
            if(facility != ""){
                res.json({"msg":"Facility Group already exist"});                
            }
            else{
                var facilityGroup = new facilitiesGroup({
                    title:req.body.facilityGroupTitle,
                    description:req.body.facilityGroupDescription,	
                    is_active:req.body.isActive
                });
                facilityGroup.save(function(err,a){
                    if(err) return res.send(500,'Error Occured: database error');
                    res.json({'status':'ClassificationGroup '+a.name+' Created ',msg:"success"});
                });
            }
        }
        
	})
    
});

facilitiesGroupsController.get('/facilityView/:id',function(req,res){
	var facilityGroupId = req.params.id;
	facilitiesGroup.findById(facilityGroupId,function(err,facility){
        facilities.find({'facilityGroupId':facilityGroupId},function(err,facilitiesByGroup){
            res.render("facility-group-view",{'facilityById':facility,'facilities':facilitiesByGroup, layout:'list'});
        });    
        
	})
});

facilitiesGroupsController.get('/facility/:id',function(req,res){
	var facilityGroupId = req.params.id;
	facilitiesGroup.findById(facilityGroupId,function(err,facility){
        facilities.find({'_id':req.params.id},function(err,facilitiesByGroup){
            res.render("update-facility-group-form",{'facilityById':facility,'facilities':facilitiesByGroup, layout:'list'});
        });
            
        
	})
});

//Update the Facility Group
facilitiesGroupsController.post('/facility/:id',function(req,res){
    
    var facilityGroupToBeUpdated = {
            title:req.body.facilityGroupTitle,
            description:req.body.facilityGroupDescription,
            is_active:req.body.isActive
        };    
    console.log(facilityGroupToBeUpdated);
	facilitiesGroup.findOneAndUpdate({_id:req.params.id},facilityGroupToBeUpdated,{upsert:false},function(err,facility){
		if(err) return res.send(500,'Error Occured: database error during Category Updation');
		console.log('Category Updated for id '+req.body.name);
        res.json({'status':'Category '+facility._id+' Updated '});        
        //res.redirect(backUrl); 
	});
});
/*
// Delete facility group By Id

facilitiesGroupsController.delete('/classification/:id',function(req,res){
	facilitiesGroup.findById(req.params.id,function(err,classification){
		if(err)return res.send(500,'Error Occured:database error'+err);
		classification.remove();
		res.status(200).json({'status':'ClassificationGroup '+req.params.id +' Deleted'});
	});
});*/

facilitiesGroupsController.put('/addFacility/:id',function(req,res){
    var facilityGroupId = req.params.id;
	var facility = new facilities({
        name:req.body.name,
        description:req.body.description,
        facilityGroupId : facilityGroupId
    });
    facility.save(function(err,a){
        if(err) return res.send(500,'Error Occured: database error');
        res.json({'status':'ClassificationGroup '+a.name+' Created ',msg:"success"});
    });
    
});

facilitiesGroupsController.post('/editFacility/:id',function(req,res){
    var facilityToBeUpdated = {
            name:req.body.name,
            description:req.body.description
        };    
    console.log(facilityToBeUpdated);
	facilities.findOneAndUpdate({_id:req.params.id},facilityToBeUpdated,{upsert:false},function(err,facility){
		if(err) return res.send(500,'Error Occured: database error during Category Updation');
		console.log('Category Updated for id '+req.body.name);
        res.json({'status':'Category '+facility._id+' Updated '});        
        //res.redirect(backUrl); 
	});
    
});
module.exports = facilitiesGroupsController;