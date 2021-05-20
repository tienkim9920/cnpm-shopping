var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        code: String,
        count: Number,
        promotion: String,
        describe: String
    }
);

var Detail_Coupon = mongoose.model('Detail_Coupon', schema, 'detail_coupon');

module.exports = Detail_Coupon;