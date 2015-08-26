var express = require('express');
var priceRules = require('../models/pricerules.js');
var bodyParser = require('body-parser');

var priceRulesController = express();


priceRulesController.use(bodyParser());

priceRulesController.get('/all',function(req,res){
    priceRules.find({},function(err,priceRule){		
        res.render("price-rules-list",{'activePriceRules':priceRule,layout:'list'});

	});
});

priceRulesController.put('/addrules',function(req,res){
    var priceRuleTitle = req.body.title;
	priceRules.find({title:priceRuleTitle},function(err,priceRule){
        console.log(priceRule);
        if(err){
            return res.send(500,'Error Occured:database error'+err);
        }
        else{
            if(priceRule != ""){
                res.json({"msg":"Price Rule already exist"});                
            }
            else{
                var newPriceRule = new priceRules({
                    title:req.body.title,
                    description:req.body.description,	
                    cost:req.body.cost,
                    costType:req.body.costType
                });
                newPriceRule.save(function(err,a){
                    if(err) return res.send(500,'Error Occured: database error');
                    res.json({'status':'ClassificationGroup '+a.title+' Created ',msg:"success"});
                });
            }
        }
        
	})
    
});

priceRulesController.get('/priceruleEdit/:id',function(req,res){
	var priceRuleId = req.params.id;
	priceRules.findById({'_id':req.params.id},function(err,priceRulesById){
        res.render("update-price-rule-form",{'priceRuleById':priceRulesById, layout:'list'});
    });
});

//Update the Price Rule
priceRulesController.post('/editrule/:id',function(req,res){
    
    var priceRuleToBeUpdated = {
            title:req.body.title,
            description:req.body.description,
            cost:req.body.cost,
            costType:req.body.costType
        };    
    console.log(priceRuleToBeUpdated);
	priceRules.findOneAndUpdate({_id:req.params.id},priceRuleToBeUpdated,{upsert:false},function(err,pricerule){
		if(err) return res.send(500,'Error Occured: database error during pricerule Updation');
		console.log('pricerule Updated for id '+req.body.title);
        res.json({'status':'pricerule '+pricerule._id+' Updated '});        
        //res.redirect(backUrl); 
	});
});

module.exports = priceRulesController;