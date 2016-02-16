var express = require('express');
var bookings = require('../models/bookings.js');
var bodyParser = require('body-parser');

var reportsController = express();


reportsController.use(bodyParser());

reportsController.get('/',function(req,res){
    res.render("reports",{layout:'list'});
});

reportsController.get('/bookings',function(req,res){
    bookings.find({},function(err,booking){
        res.render("booking-list",{'bookingList':booking,layout:'list'});
    });
});


module.exports = reportsController;