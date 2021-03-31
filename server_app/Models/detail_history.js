var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_history: String,
        name_product: String,
        price_product: String,
        count: Number,
        image: String,
        size: String
    }
);

var Detail_History = mongoose.model('Detail_History', schema, 'detail_history');

module.exports = Detail_History;