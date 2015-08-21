var express = require('express');
var facilitiesGroup = require('../models/facilitiesGroup.js');
var bodyParser = require('body-parser');

var facilitiesGroupsController = express();


facilitiesGroupsController.use(bodyParser());

facilitiesGroupsController.get('/addFacilityGroup',function(req,res){
    res.render('add-new-facility-group',{layout:'list'}); 
});

module.exports = facilitiesGroupsController;