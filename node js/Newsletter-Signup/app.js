const express = require('express');
const bodyparser = require('body-parser')
const request = require('request');
const https = require('https');
const { url } = require('inspector');
const app = express();

const port = 3000;
const mailchipapi = 'ba749552f9eeaa63152d6d5516c9064d-us12';
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.send('hello')
})

app.get('/sign', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/sign-data', function(req, res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const mail = req.body.email;
    const data = {
    members: [
            {
                email_address: mail,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname

                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);

    const url = 'https://us12.api.mailchimp.com/3.0/lists/c1bc427d0e';

    const options = {
        method: "POST",
        auth: 'dhruv:ba749552f9eeaa63152d6d5516c9064d-us12'
        
    }
    const request = https.request(url, options, function(responce){

        if (responce.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }
        responce.on('data', function(data){
            console.log(JSON.parse(data));
        })

    })
    
    request.write(jsondata);
    request.end();
    console.log(res.statusCode);
})

app.post('/failure', function(req, res) {
    res.redirect('/sign')
})

app.listen(port, function(req, res){
    console.log('running')
})


// c1bc427d0e