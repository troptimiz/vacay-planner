var express = require('express');
var taxTypes = require('../models/taxType.js');
var tax = require('../models/tax.js');
var Product = require('../models/products.js');
var bodyParser = require('body-parser');

var taxTypeController = express();


taxTypeController.use(bodyParser());



//Londing the view for all Tax Type saved 
taxTypeController.get('/all',function(req,res){
    taxTypes.find({},function(err,taxType){		
        res.render("tax-type-list",{'activeTaxTypes':taxType,layout:'list'});
	});
});

//Not sure, if it is used
taxTypeController.get('/addTaxTypes',function(req,res){
    res.render('add-new-tax-type',{layout:'list'}); 
});

//Saving Newly added Tax Type to db using PUT
taxTypeController.put('/taxType',function(req,res){
    var taxTypeValue = req.body.taxType;
	taxTypes.find({taxType:taxTypeValue},function(err,tax){
		console.log(taxTypeValue);
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

//obtaining the particular saved Tax type and invoking the corresponding handlebar template - View
taxTypeController.get('/taxTypeView/:id',function(req,res){
	var taxTypeId = req.params.id;
	taxTypes.findById(taxTypeId,function(err,taxType){
        tax.find({'taxTypeId':taxTypeId},function(err,taxByType){
            res.render("tax-type-view",{'taxType':taxType, 'taxes':taxByType, layout:'list'});
        });    
        
	})
});

//loading the handlebar template on click edit on particular tax type
taxTypeController.get('/taxtype/:id',function(req,res){
	var taxTypeId = req.params.id;
	taxTypes.findById(taxTypeId,function(err,taxType){
        //facilities.find({'_id':req.params.id},function(err,facilitiesByGroup){
            res.render("update-tax-type-form",{'taxTypeById':taxType, layout:'list'});
        //});
            
        
	})
});

//Editing the existing handlebar template Tax Type
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


//Deleting Tax Type
taxTypeController.delete('/taxtype/:id',function(req,res){
	taxTypes.findById(req.params.id,function(err,taxType){
		if(err)return res.send(500,'Error Occured:database error'+err);
		tax.count({"taxTypeId":req.params.id},function(err,count){
            if(count > 0){
                res.status(200).json({"status":"error","msg":"The tax type contains associated taxes with product and this taxtype can't be removed."});   
            } else {
                taxType.remove();
                res.status(200).json({'status':'success','msg':'taxTypes '+req.params.id +' Deleted'});
            }
		});		
	});
});


//Adding new tax in tax type
taxTypeController.put('/addTax/:id',function(req,res){ 
    var taxTypeId = req.params.id;
	var taxTypes = req.body.taxType;
	var taxTobeSave = new tax({
        taxDescription:req.body.taxDesc,
        state:req.body.state,
        tax:req.body.tax,
        taxTypeId : taxTypeId,
		taxType:req.body.taxType
    });
    taxTobeSave.save(function(err,a){
        if(err) return res.send(500,'Error Occured: database error');
		console.log('Tax Added for '+ taxTypes);
        res.json({'status':'ClassificationGroup '+a.taxDescription+' Created ',msg:"success"});
    });
    
});

//Editing tax in Tax Type
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

//Delete tax in tax type
taxTypeController.delete('/tax/:id',function(req,res){
    Product.count({"taxes.taxId":req.params.id},function(err,count){
        if(count > 0) {
            res.status(200).json({"status":"error","msg":"The tax associated with product and it can't be removed"});   
        } else {
            tax.findById(req.params.id, function(err, taxById){
                if(err) res.send(500,'Error Occured:database error'+err);
                taxById.remove();
                res.status(200).json({"status":"success", "msg":"The tax "+req.params.id+"deleted successfully"});
            });
        }
    });
});



module.exports = taxTypeController;