const express = require("express");
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const ejs = require("ejs");
const  mongoose = require("mongoose");


const app = express();
app.use(bodyparser.urlencoded({extended: true}))
app.set('view engine', 'ejs');


mongoose.connect('mongodb://127.0.0.1:27017/practicdb');

const animal = mongoose.Schema({
    name: {type: String},
    gender:{type: String}
}
)

const data = mongoose.model('animaldata', animal);

const animaldata = new data({
    name:"dog",
    gender:"male"
})
// animaldata.save();


app.get("/",(req, res) => {

    res.render("home");
})

app.post("/", (req,res)=>{
    res.send(req.body)
})

app.get("/new/:pass", (req, res)=>{
    // res.send('hello ' +req.params.pass)
    bcrypt.hash(req.params.pass, saltRounds, function(err, hash) {
        res.send(hash)
    });
})








app.listen(3000, (req, res)=>{
    console.log("port is running on 3000")
})


