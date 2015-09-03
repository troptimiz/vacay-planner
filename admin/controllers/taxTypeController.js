var express = require('express');
var taxTypes = require('../models/taxType.js');
var tax = require('../models/tax.js');
var bodyParser = require('body-parser');

var taxTypeController = express();


taxTypeController.use(bodyParser());

taxTypeController.get('/all',function(req,res){
    taxTypes.find({},function(err,taxType){		
        res.render("tax-type-list",{'activeTaxTypes':taxType,layout:'list'});
	});
});
taxTypeController.get('/addTaxTypes',function(req,res){
    res.render('add-new-tax-type',{layout:'list'}); 
});

taxTypeController.put('/taxType',function(req,res){
    var taxTypeValue = req.body.taxType;
	taxTypes.find({taxType:taxTypeValue},function(err,tax){
        console.log(tax);
        if(err){
            return res.send(500,'Error Occured:database error'+err);
        }
        else{
            if(tax != ""){
                res.json({"msg":"Tax Type already exist"});                
            }
            else{
                var taxType = new taxTypes({
                    taxType:req.body.taxType,
                    taxDescription:req.body.taxDescription,	
                    is_active:req.body.isActive
                });
                taxType.save(function(err,a){
                    if(err) return res.send(500,'Error Occured: database error');
                    res.json({'status':'tax Type '+a.taxType+' Created ',msg:"success"});
                });
            }
        }
        
	})
    
});

taxTypeController.get('/taxTypeView/:id',function(req,res){
	var taxTypeId = req.params.id;
	taxTypes.findById(taxTypeId,function(err,taxType){
        tax.find({'taxTypeId':taxTypeId},function(err,taxByType){
            res.render("tax-type-view",{'taxType':taxType, 'taxes':taxByType, layout:'list'});
        });    
        
	})
});

taxTypeController.get('/taxtype/:id',function(req,res){
	var taxTypeId = req.params.id;
	taxTypes.findById(taxTypeId,function(err,taxType){
        //facilities.find({'_id':req.params.id},function(err,facilitiesByGroup){
            res.render("update-tax-type-form",{'taxTypeById':taxType, layout:'list'});
        //});
            
        
	})
});


taxTypeController.post('/taxtype/:id',function(req,res){
    
    var taxTypeToBeUpdated = {
            taxType:req.body.taxType,
            taxDescription:req.body.taxDescription,
            is_active:req.body.isActive
        };    
    console.log(taxTypeToBeUpdated);
	taxTypes.findOneAndUpdate({_id:req.params.id},taxTypeToBeUpdated,{upsert:false},function(err,taxtype){
		if(err) return res.send(500,'Error Occured: database error during Category Updation');
		console.log('Tax type Updated for id '+req.body.taxType);
        res.json({'status':'Tax type '+taxtype._id+' Updated '});        
        //res.redirect(backUrl); 
	});
});


taxTypeController.put('/addTax/:id',function(req,res){ 
    var taxTypeId = req.params.id;
	var taxTobeSave = new tax({
        taxDescription:req.body.taxDesc,
        state:req.body.state,
        tax:req.body.tax,
        taxTypeId : taxTypeId
    });
    taxTobeSave.save(function(err,a){
        if(err) return res.send(500,'Error Occured: database error');
        res.json({'status':'ClassificationGroup '+a.taxDescription+' Created ',msg:"success"});
    });
    
});

taxTypeController.post('/editTax/:id',function(req,res){
    var taxToBeUpdated = {
            taxDescription:req.body.taxDesc,
            state:req.body.state,
            tax:req.body.tax
        }; 
	tax.findOneAndUpdate({_id:req.params.id},taxToBeUpdated,{upsert:false},function(err,taxById){
		if(err) return res.send(500,'Error Occured: database error during Tax Updation');
		console.log('Tax Updated for '+req.body.taxDescription);
        res.json({'status':'Tax '+taxById._id+' Updated '});        
        //res.redirect(backUrl); 
	});
    
});



module.exports = taxTypeController;