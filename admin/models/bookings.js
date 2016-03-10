var mongoose =require('mongoose');

// TODO : Need to externalize the environment configuration

//mongoose.connect('mongodb://localhost/vacayplanner');

// Just Creating new connections

var options = {
    db: { native_parser: true },
    server: { poolSize: 2 }
}


mongoose.createConnection('mongodb://localhost/vacayplanner',options);


var bookingsScema = mongoose.Schema({
    _class : String,
    propertyId : String,
    packageId : String,
	country_code: String,
	country:String,
	state:String,
	city:String,
	numOfAdult:Number,
	numOfChild:Number,
	paymentAuthId:String,
	propertyName:String,
    customerId : String,
    firstName : String,
    lastName : String,
    email : String,
    contactNumnber : Number,
    numOfAdult : Number,
    numOfChild : Number,
    numOfGents : Number,
    numOfLadies : Number,
    propertyType : String,
    checkInDate : String,
    chckoutDate : String,
    bookingDate : String,
    totalAmount : Number,
    totalDiscount : Number,
    totalTax : Number,
	cancellationDate:String
});

var bookings = mongoose.model('bookings',bookingsScema);

module.exports = bookings;

