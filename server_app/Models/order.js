var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_user: {
            type: String,
            ref: 'Users'
        },
        email: String,
        phone: String,
        total: Number,
        status: Boolean,
        delivery: Number,
        id_payment: String,
        id_delivery: {
            type: String,
            ref: 'Delivery'
        },
    }
);

var Order = mongoose.model('Order', schema, 'order');

module.exports = Order;