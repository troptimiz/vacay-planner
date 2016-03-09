var express = require('express');
var priceRules = require('../models/pricerules.js');
var Product = require('../models/products.js');
var bodyParser = require('body-parser');

var priceRulesController = express();


priceRulesController.use(bodyParser());

priceRulesController.get('/all',function(req,res){
    priceRules.find({},function(err,priceRule){		
        res.render("price-rules-list",{'activePriceRules':priceRule,layout:'list'});
	});
});

priceRulesController.get('/getpricerules/:type',function(req,res){
    var priceRuleType = req.params.type;
    priceRules.find({"priceRuleType":priceRuleType},function(err,priceRule){		
        res.status(200).json({'data':priceRule});
	});
});

priceRulesController.put('/addrules',function(req,res){
    var priceRuleType = req.body.priceRuleType;
    var newPriceRule = {};
	var ageCriteria;
    if(priceRuleType == "gender"){
        console.log('inside pricerule');
		if(req.body.ageCriteria == '$btween') {
			ageCriteria = {
				valueFrom: req.body.fAge,
				valueTo: req.body.tAge,
				criteria: req.body.ageCriteria
			};
		} else {
			ageCriteria = {
				value: req.body.age,
				criteria: req.body.ageCriteria
			};
		}
        newPriceRule = new priceRules({            
            priceRuleType:req.body.priceRuleType,
            genderType:req.body.gender,
            priceType:req.body.priceType,	
            price:req.body.genderPrice,
			ageCriteria: ageCriteria
        });   
    } 
    else if(priceRuleType == "event"){
        newPriceRule = new priceRules({            
            priceRuleType:req.body.priceRuleType,
            eventType:req.body.eventType,
            priceType:req.body.priceType,	
            price:req.body.eventPrice
        });   
    }
    else if(priceRuleType == "discount"){
        newPriceRule = new priceRules({            
            priceRuleType:req.body.priceRuleType,
            priceType:req.body.priceType,	
            price:req.body.discountPrice,
            startDate:req.body.startDate,
            endDate:req.body.endDate
        });
    }
    else if(priceRuleType == "cancellation"){
        if(req.body.cancelType == 'refundable'){
             newPriceRule = new priceRules({            
                priceRuleType:req.body.priceRuleType,
                cancellationType:req.body.cancelType,
                priceType:req.body.priceType,	
                price:req.body.cancelPrice,
                durationType:req.body.durationType,
                duration:req.body.duration,
                startDate:req.body.startDate,
                endDate:req.body.endDate
            });
        }
        else{
            var na = "NA"; 
            newPriceRule = new priceRules({            
                priceRuleType:req.body.priceRuleType,
                cancellationType:req.body.cancelType,	
                price:0,
                priceType:na,
                durationType:na,
                duration:0,
                startDate:na,
                endDate:na
            });  
        }
    }
    else if(priceRuleType == "group"){
          newPriceRule = new priceRules({            
                priceRuleType:req.body.priceRuleType,
                priceType:req.body.priceType,	
                price:req.body.groupPrice,
                grouplimit:req.body.groupLimit,
                startDate:req.body.startDate,
                endDate:req.body.endDate
            }); 
    }
                
    newPriceRule.save(function(err,a){
        if(err) return res.send(500,'Error Occured: database error');
        res.json({'status':'Pricerule '+a.gender+' Created ',msg:"success"});
    });
            
    
});

priceRulesController.get('/priceruleEdit/:id',function(req,res){
	var priceRuleId = req.params.id;
	priceRules.findById({'_id':req.params.id},function(err,priceRulesById){
        res.render("update-price-rule-form",{'priceRuleById':priceRulesById, layout:'list'});
    });
});

//Update the Price Rule
priceRulesController.post('/editrule/:id',function(req,res){
    var priceRuleType = req.body.priceRuleType;
    var priceRuleToBeUpdated = {};
    if(priceRuleType == "gender"){
        priceRuleToBeUpdated = {            
            priceRuleType:req.body.priceRuleType,
            genderType:req.body.gender,
            priceType:req.body.priceType,	
            price:req.body.genderPrice
        };   
    } 
    else if(priceRuleType == "event"){
        priceRuleToBeUpdated = {            
            priceRuleType:req.body.priceRuleType,
            eventType:req.body.eventType,
            priceType:req.body.priceType,	
            price:req.body.eventPrice
        };   
    }
    else if(priceRuleType == "discount"){
        priceRuleToBeUpdated = {            
            priceRuleType:req.body.priceRuleType,
            priceType:req.body.priceType,	
            price:req.body.discountPrice,
            startDate:req.body.startDate,
            endDate:req.body.endDate
        };
    }
    else if(priceRuleType == "cancellation"){
        if(req.body.cancelType == 'refundable'){
             priceRuleToBeUpdated = {            
                priceRuleType:req.body.priceRuleType,
                cancellationType:req.body.cancelType,
                priceType:req.body.priceType,	
                price:req.body.cancelPrice,
                durationType:req.body.durationType,
                duration:req.body.duration,
                startDate:req.body.startDate,
                endDate:req.body.endDate
            };
        }
        else{
            var na = "NA"; 
            priceRuleToBeUpdated = {            
                priceRuleType:req.body.priceRuleType,
                cancellationType:req.body.cancelType,	
                price:0,
                priceType:na,
                durationType:na,
                duration:0,
                startDate:na,
                endDate:na
            };  
        }
    }
    else if(priceRuleType == "group"){
          priceRuleToBeUpdated = {            
                priceRuleType:req.body.priceRuleType,
                priceType:req.body.priceType,	
                price:req.body.groupPrice,
                grouplimit:req.body.groupLimit,
                startDate:req.body.startDate,
                endDate:req.body.endDate
            }; 
    }
	priceRules.findOneAndUpdate({_id:req.params.id},priceRuleToBeUpdated,{upsert:false},function(err,pricerule){
		if(err) return res.send(500,'Error Occured: database error during pricerule Updation');
		console.log('pricerule Updated for id '+req.body.title);
        res.json({'status':'pricerule '+pricerule._id+' Updated '});        
        //res.redirect(backUrl); 
	});
});

// Delete priceRules By Id

priceRulesController.delete('/priceruleDelete/:id',function(req,res){
	Product.count({"packages.pricerules.priceRuleId":req.params.id},function(err, count){
        if(count > 0){
            res.status(200).json({"status":"error",msg:"The price rule associated with product and it can't be removed."});   
        } else {
            priceRules.findById(req.params.id,function(err,pricerule){
                if(err)return res.send(500,'Error Occured:database error'+err);
                pricerule.remove();
                res.status(200).json({'status':'Price Rule '+req.params.id +' Deleted'});
            });   
        }
    });
    
});

module.exports = priceRulesController;