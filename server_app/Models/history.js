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
        id_find: String,
        fullname: String,
        phone: String,
        address: String,
        email: String,
        total: Number,
        status: String,
        delivery: Boolean,

    }
);

var History = mongoose.model('History', schema, 'history');

module.exports = History;