var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        permission: String
    }
);

var Permission = mongoose.model('Permission', schema, 'permission');

module.exports = Permission;