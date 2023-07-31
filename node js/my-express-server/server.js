const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send('heelo world')
// })

app.get('/', function (req, res) {
    res.send('<h1>this is my first express program</h1>')
})

app.get('/contact-me', function (req, res) {
    res.send('you can contact me by : cpxjacksparrow@gmail.com')
})

app.get('/about', function (req, res){
    res.send(templates/index.html)
})

app.listen(port, () => {
    console.log('example of app '+ port)
})