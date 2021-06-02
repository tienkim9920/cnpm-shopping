var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        code: String,
        count: Number,
        promotion: String,
        describe: String
    }
);

var Coupon = mongoose.model('Coupon', schema, 'coupon');

module.exports = Coupon;