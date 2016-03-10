var express = require('express');
var bookings = require('../models/bookings.js');
var bodyParser = require('body-parser');
var Countries = require('../models/countries.js');
var States = require('../models/states.js');
var Cities = require('../models/cities.js');

var reportsController = express();

var Passport = require('passport');
var flash = require('connect-flash'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var expressSession = require('express-session');
reportsController.use(bodyParser());
reportsController.use(cookieParser());
reportsController.use(expressSession({ secret: '1234QWERTY'}));
reportsController.use(Passport.initialize());
reportsController.use(Passport.session());
reportsController.use(flash());

reportsController.get('/cities/:id',function(req,res){
    var stateID = req.params.id;
    Cities.find({'stateCode':stateID},function(err,selectedCities){
        res.status(200).json({'cities':selectedCities});
    });
});

reportsController.get('/states/:id',function(req, res){
    var countryID = req.params.id;
    States.find({'countryCode':countryID},function(err,selectedStates){
        res.status(200).json({'states':selectedStates});
    });
});

reportsController.get('/getByDate/:type', function(req, res){
    var startDate = req.query.startDate;
	var endDate = req.query.endDate;
	console.log(startDate);
	console.log(req.params.type);
	if (req.params.type === 'Confirmed') {
		if(startDate != undefined && endDate != undefined) {
			console.log('one');
			bookings.find({'bookingDate': {$gte: startDate, $lt: endDate},'status':'Confirmed'},function(err, results){
				res.status(200).json({'data':results});
			});
		} else if (startDate == undefined && endDate != undefined) {
			console.log('two');
			bookings.find({'bookingDate': {$lt: endDate},'status':'Confirmed'},function(err, results){
				res.status(200).json({'data':results});
			});
		} else if (startDate != undefined && endDate == undefined) {
			console.log('three');
			bookings.find({'bookingDate': {$gte: startDate},'status':'Confirmed'},function(err, results){
				res.status(200).json({'data':results});
			});
		}
	} else {
		if(startDate != undefined && endDate != undefined) {
			console.log('one');
			bookings.find({'cancellationDate': {$gte: startDate, $lt: endDate}, 'status': 'Cancelled'},function(err, results){
				res.status(200).json({'data':results});
			});
		} else if (startDate == undefined && endDate != undefined) {
			console.log('two');
			bookings.find({'cancellationDate': {$lt: endDate}, 'status': 'Cancelled'},function(err, results){
				res.status(200).json({'data':results});
			});
		} else if (startDate != undefined && endDate == undefined) {
			console.log('three');
			bookings.find({'cancellationDate': {$gte: startDate}, 'status': 'Cancelled'},function(err, results){
				res.status(200).json({'data':results});
			});
		}
	}
});

reportsController.get('/',function(req,res){
    res.render("reports",{layout:'list'});
});

reportsController.get('/bookings',function(req,res){
	if(req.session.passport.user){
		bookings.find({status:'Confirmed'},function(err,booking){
			Countries.find({},function (err, countries){
				res.render("booking-list",{'bookingList':booking,countries:countries,layout:'list'});
			});
		});
	} else {
		res.redirect('/account/session');
	}
});

reportsController.get('/cancellations',function(req,res){
	if(req.session.passport.user){
		bookings.find({status:'Cancelled'},function(err,booking){
			Countries.find({},function (err, countries){
				res.render("cancellation-list",{'bookingList':booking,countries:countries,layout:'list'});
			});
		});
	} else {
		res.redirect('/account/session');
	}
});


module.exports = reportsController;