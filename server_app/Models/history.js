var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_user: String,
        id_find: String,
        fullname: String,
        phone: String,
        address: String,
        email: String,
        total: Number,
        status: Boolean,
        delivery: Boolean,
        id_payment: String,
    }
);

var History = mongoose.model('History', schema, 'history');

module.exports = History;