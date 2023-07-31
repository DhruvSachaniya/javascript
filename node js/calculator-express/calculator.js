const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
const route = 3000;
 
app.get('/', function(req, res){
    // res.send('hello world');
    res.sendFile(__dirname + "/index.html")
})

app.post('/hi', function(req, res) {
    var val1 = Number(req.body.num1);
    var val2 = Number(req.body.num2);
    var c = val1 + val2;
    res.send("the value is "+c);
})

//bmi calculator

app.get('/bmicalculator', function(req, res) {
    res.sendFile(__dirname + '/bmicalculator.html')
})

app.post('/resultbmi', function(req, res) {
    var weight = parseFloat(req.body.num1);
    var height = parseFloat(req.body.num2);
    var bmi = Math.floor((weight) / (height * height))
    res.send('your bmi is '+bmi)
    
    
})


app.listen(route, function () {
    console.log('playing with this route' + route)
})