const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//database activity
mongoose.connect('mongodb://127.0.0.1:27017/Wiki-Api');

const articlesschema = mongoose.Schema({
  title: String,
  content: String
})

const articlesItem = mongoose.model('articles', articlesschema);

const new1 = new articlesItem({title: 'devil', content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})

// new1.save();

app.get('/', function(req, res){
    res.send('running')
})

app.get('/articles', function(req, res){
  articlesItem.find().then(function(foundlist){
    res.send(foundlist);
  })
  .catch(function(err){
    res.send(err)
  })
})

app.post('/articles', function(req, res){

  const new2 = articlesItem({
    title: req.body.title,
    content: req.body.content
  })

  new2.save().then(function(){
    res.send('succesfully sen the post request')
  })
  .catch(function(err){
    res.send('ther is an error to send the post request')
  })
})


app.delete('/articles', function(req, res){
  articlesItem.deleteMany().then(function(){
    res.send('succesfully deleted the all articles')
  })
  .catch(function(err){
    res.send('there is and error to delete all the articles')
  })
})

app.route('/articles/:name')
.get(function(req, res){
  articlesItem.findOne({title: req.params.name}).then(function(foundlist){
    if(foundlist){
      res.send(foundlist);
    } else {
      res.send('not found')
    } 
  })
}  
)
.put(function(req, res){
  articlesItem.updateOne(
    {title: req.params.name},
    {title: req.body.title, content: req.body.content},
  ).then(function(){
    res.send('succesfully update the post')
  })
}
)
.patch(function(req,res){
  articlesItem.updateOne(
    { title: req.params.name },
    { $set:  req.body } 
  ).then(function(){
    res.send('succesfully updated the post')
  })
})
.delete(function(req, res){
  articlesItem.deleteOne({title: req.params.name})
    .then(function(){
      res.send('succesfully deleted the perticluer post')
    })
    .catch(function(err){
      res.send('there is an error to delete the pertcluer post')
    })
});


app.listen(3000, function(req, res){
    console.log('server is running on post 3000')
})


