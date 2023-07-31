const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/todoreactdb');

const tododataschema = mongoose.Schema({
    note: String
})

module.exports.notedata = mongoose.model('Todo', tododataschema);