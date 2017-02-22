var mongoose = require('mongoose');

// TODO : Need to externalize the environment configuration 

//mongoose.connect('mongodb://localhost/vacayplanner');	

// Just Creating new connections

var options = {
    db: {
        native_parser: true
    },
    server: {
        poolSize: 2
    }
}


mongoose.createConnection('mongodb://localhost/vacayplanner', options);


var taxTypeSchema = mongoose.Schema({
    taxType: String,
    taxDescription: String,
    is_active:Boolean
});

var taxTypes = mongoose.model('taxtypes', taxTypeSchema);

module.exports = taxTypes;
