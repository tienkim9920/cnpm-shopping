var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        id_product: {
            type: String,
            ref: 'Products'
        },
        id_user: {
            type: String,
            ref: 'Users'
        },
        content: String,
        star1: String,
        star2: String,
        star3: String,
        star4: String,
        star5: String
    }
);

var Comment = mongoose.model('Comment', schema, 'comment');

module.exports = Comment;