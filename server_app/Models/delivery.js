var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_delivery: String,
        from: String,
        to: String,
        distance: String,
        duration: String,
        price: String
    }
);

var Delivery = mongoose.model('Delivery', schema, 'delivery');

module.exports = Delivery;