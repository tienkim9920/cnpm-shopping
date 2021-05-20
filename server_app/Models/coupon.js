var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        status_use: Boolean,
        id_user: {
            type: String,
            ref: 'Users'
        },
        coupon: {
            type: String,
            ref: 'Detail_Coupon'
        }
    }
);

var Coupon = mongoose.model('Coupon', schema, 'coupon');

module.exports = Coupon;