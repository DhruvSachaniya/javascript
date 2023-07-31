const express = require("express");
const bodyParser = require("body-parser");
const {todo} = require('./models/todo.model')
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("hello world")
})

app.get('/senddata', (req, res)=>{
    todo.find().then((e)=>{
    res.json({
        tododata : e,
    })
})
})



app.post("/todo", (req, res)=>{
    data = req.body;
    const newtodo = new todo({
        title: data.todoTitle,
        content: data.todoContent
    })
    newtodo.save();
    res.send(data);
})

app.post("/tododata", async (req, res)=>{
    data = req.body;
    // console.log(data.id)
    try {
        const result = await todo.deleteOne({ _id: data.id });
        console.log(`${result.deletedCount} document(s) deleted.`);
        res.sendStatus(200); // Send a success status code
      } catch (error) {
        console.error('Error deleting document:', error);
        res.sendStatus(500); // Send an error status code
      }
})


app.listen(5000, (req, res)=>{
    console.log("server is running");
})