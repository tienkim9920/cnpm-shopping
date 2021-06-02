var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        promotion: Number,
        describe: String,
        status: Boolean,
        start: Date,
        end: Date,
        id_product: {
            type: String,
            ref: 'Products'
        }
    }
);

var Sale = mongoose.model('Sale', schema, 'sale');

module.exports = Sale;