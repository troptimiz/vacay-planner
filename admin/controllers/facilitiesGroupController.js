var express = require('express');
var facilitiesGroup = require('../models/facilitiesGroup.js');
var facilities = require('../models/facilities.js');
var Product = require('../models/products.js');
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

// Delete facility group By Id

facilitiesGroupsController.delete('/facilitygroup/:id',function(req,res){
    var facilityGroupId = req.params.id;
    facilities.count({'facilityGroupId':facilityGroupId},function(err,count){
        if(count > 0){
            res.status(200).json({"status":"error","msg":"Facility Group contains associated facilities and it can't be removed. Delete all the facilites and try again."});  
        }
        else{
            facilitiesGroup.findById(req.params.id,function(err,facility){
                if(err)return res.send(500,'Error Occured:database error'+err);
                facility.remove();
                res.status(200).json({'status':'success','msg':'Facility '+req.params.id +' Deleted'});
            }); 
        }
    });
    
    /*Product.count({"facilities.facilityId":req.params.id},function(err,count){
        if(count > 0){
            res.status(200).json({"status":"Facility trying to delete is associated with the product and it can't be removed"});  
        }
        else{
            facilitiesGroup.findById(req.params.id,function(err,facility){
                if(err)return res.send(500,'Error Occured:database error'+err);
                facility.remove();
                res.status(200).json({'status':'Facility '+req.params.id +' Deleted'});
            }); 
        }
    });*/
	/**/
});

/**
 * Delete facility by ID
**/
facilitiesGroupsController.delete('/facility/:id',function(req,res){
    var facilityId = req.params.id;
    Product.count({"facilities.facilityId":req.params.id},function(err,count){
        if(count > 0){
            res.status(200).json({"status":"error","msg":"Facility trying to delete is associated with the product and it can't be removed"});  
        }
        else{
            facilities.findById(req.params.id,function(err,facility){
                if(err)return res.send(500,'Error Occured:database error'+err);
                facility.remove();
                res.status(200).json({'status':'success','msg':'Facility '+req.params.id +' Deleted'});
            }); 
        }
    });
});

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