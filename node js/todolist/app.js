const express = require('express');
const bodyparser = require('body-parser')
//modules examples 
const date = require(__dirname +'/date.js')
const practi = require(__dirname + '/practic.js')

const app = express();


const route = 3000;
let ithems = ["Best food", "worst food", "disgusting food"];
let worklist = [];

app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set("view engine", "ejs");

app.get('/', function(req, res){

    let day = date();
    res.render("list", {ofday: day, newithem: ithems})

})

app.post('/', function(req, res) {
    
    let ithem = req.body.first;

    if (req.body.button === "Work") {
        let ithem = req.body.first;
        worklist.push(ithem);
        res.redirect("/work")
    } else {
        ithems.push(ithem);
        res.redirect('/');
    }

    
})

app.get('/work', function(req, res){
    res.render('list', {ofday: 'Work List', newithem: worklist})
})

app.post('/work', function(req, res){
    let ithem = req.body.first;
    worklist.push(ithem);
    res.redirect('/work')

})

app.get('/about', function(req, res) {
    res.render('about')
})


app.listen(route, function(req, res){
    console.log('running')
    let d = practi.just();
})