var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_history: String,
        from: String,
        to: String,
        distance: String,
        duration: String,
        price: String
    }
);

var Delivery = mongoose.model('Delivery', schema, 'delivery');

module.exports = Delivery;