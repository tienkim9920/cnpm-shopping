var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        count: Number,
        size: String,
        id_order: String,
        id_product: {
            type: String,
            ref: 'Products',
        }
    }
);

var Detail_Order = mongoose.model('Detail_Order', schema, 'detail_order');

module.exports = Detail_Order;