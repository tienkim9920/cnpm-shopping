var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: {
            type: String,
            ref: 'Users'
        },
        id_payment: {
            type: String,
            ref: 'Payment'
        },
        id_delivery: {
            type: String,
            ref: 'Delivery'
        },
        fullname: String,
        phone: String,
        address: String,
        total: Number,
        status: String,
        delivery: Boolean,

    }
);

var Order = mongoose.model('Order', schema, 'order');

module.exports = Order;