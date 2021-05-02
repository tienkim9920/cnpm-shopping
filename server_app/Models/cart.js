var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_user: String,
        id_product: String,
        name_product: String,
        price_product: Number,
        count: Number,
        image: String,
        size: String,
    }
);

var Carts = mongoose.model('Carts', schema, 'cart');

module.exports = Carts;