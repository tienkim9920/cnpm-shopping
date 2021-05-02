var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        category: String
    }
);

var Category = mongoose.model('Category', schema, 'category');

module.exports = Category;