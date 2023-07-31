const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const {notedata} = require('./models/server.model')

const app = express();
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

app.get('/senddata', (req, res)=>{
    res.json({
        "name": "your name is send suucessfuly"
    })
})


app.post("/test", (req, res)=>{
    data = req.body;
    data.map((e)=>{
        console.log(e);
    })
    // const newdata = new notedata({
    //     note: data
    // })
})

app.listen(5000, (req,res)=>{
    console.log("port is running on 5000");
})