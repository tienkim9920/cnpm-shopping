var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_product: String,
        id_user: {
            type: String,
            ref: 'Users'
        },
        content: String,
        star: Number,
    }
);

var Comment = mongoose.model('Comment', schema, 'comment');

module.exports = Comment;