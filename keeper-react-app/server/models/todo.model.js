const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/tododb');

const todoschema = mongoose.Schema({
    title: String,
    content: String
})

// todo.find((e)=>{
//     console.log(e)
// })

module.exports.todo = mongoose.model('Todo', todoschema);