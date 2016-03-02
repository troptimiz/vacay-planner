var express = require('express');
var bookings = require('../models/bookings.js');
var bodyParser = require('body-parser');
var Countries = require('../models/countries.js');
var States = require('../models/states.js');
var Cities = require('../models/cities.js');

var reportsController = express();


reportsController.use(bodyParser());

reportsController.get('/cities/:id',function(req,res){
    var stateID = req.params.id;
    Cities.find({'stateCode':stateID},function(err,selectedCities){
        res.status(200).json({'cities':selectedCities});
    });
});

reportsController.get('/states/:id',function(req,res){
    var countryID = req.params.id;
    States.find({'countryCode':countryID},function(err,selectedStates){
        res.status(200).json({'states':selectedStates});
    });
});

reportsController.get('/',function(req,res){
    res.render("reports",{layout:'list'});
});

reportsController.get('/bookings',function(req,res){
    bookings.find({status:'Confirmed'},function(err,booking){
        Countries.find({},function (err, countries){
            res.render("booking-list",{'bookingList':booking,countries:countries,layout:'list'});
        });
    });
});

reportsController.get('/cancellations',function(req,res){
    bookings.find({status:'Cancelled'},function(err,booking){
        Countries.find({},function (err, countries){
            res.render("cancellation-list",{'bookingList':booking,countries:countries,layout:'list'});
        });
    });
});


module.exports = reportsController;