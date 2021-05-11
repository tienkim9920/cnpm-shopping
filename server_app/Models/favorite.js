var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: {
            type: String,
            ref: 'Users'
        },
        id_product: {
            type: String.apply,
            ref: 'Products'
        }
    }
);

var Favorite = mongoose.model('Favorite', schema, 'favorite');

module.exports = Favorite;