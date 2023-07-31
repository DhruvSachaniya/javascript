const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function(req, res) {
res.sendFile(__dirname + '/index.html')

})

app.post('/', function(req, res){
    
    const query = req.body.cityname;
    const appid = 'e778bda5f77bc1f2ec53a6e77712c1aa'
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appid+"&units=" + unit;

    https.get(url, function(responce){

        console.log(responce.statusCode);

        responce.on('data', function(data){

            const wetherdata = JSON.parse(data);
            const tempreture = wetherdata.main.temp;
            const conname = wetherdata.name;
            res.write('<p>The wether is currently ' + conname + '</p>')
            res.write('<h1>the tempreture in ' + conname+' is' +tempreture+ ' dgrees celcius'+'</h1>')
            res.send();
        })
    })
})



app.listen(port, function(req, res) {
    console.log('running')
})