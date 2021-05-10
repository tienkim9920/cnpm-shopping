var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_order: {
            type: String,
            ref: 'Order'
        },
        id_product: {
            type: String,
            ref: 'Products',
        },
        name_product: String,
        price_product: String,
        count: Number,
        size: String
    }
);

var Detail_Order = mongoose.model('Detail_Order', schema, 'detail_order');

module.exports = Detail_Order;