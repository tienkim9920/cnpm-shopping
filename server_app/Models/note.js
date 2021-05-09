var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        fullname: String,
        phone: String,
    }
);

var Note = mongoose.model('Note', schema, 'note');

module.exports = Note;