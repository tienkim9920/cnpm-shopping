var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_category: String,
        name_product: String,
        price_product: String,
        image: String,
        describe: String,
    }
);

var Products = mongoose.model('Products', schema, 'product');

module.exports = Products;