const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//database connectivity
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const itemsschema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

const Item = mongoose.model('Item', itemsschema);

const listitemname = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  listarr: [itemsschema]
})

const List = mongoose.model('List', listitemname);

const first = new Item({name: 'Buy Food'})
const second = new Item({name: "Cook Food"})
const third = new Item({name: 'Eat Food'})

const ithemarray = [first, second, third]


app.get("/", function(req, res) {

  Item.find().then(function(foundithem){
    if(foundithem.length === 0){

      Item.insertMany(ithemarray)

      res.redirect('/');
    } else {
      res.render("list", {listTitle: "today", newListItems: foundithem});
    }
   
  })
});

app.post("/", function(req, res){

  const itemname = req.body.newItem;
  const listname = req.body.list;

  const four = new Item({name: itemname})

  if(listname === "today") {
    four.save();
    res.redirect('/');
  } else {
    List.findOne({name: listname})
    .then(function(foundlist) {
      foundlist.listarr.push(four);
      foundlist.save();
      res.redirect('/'+ listname)
    })
  }




});

app.post('/delete', function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  
  if (listName === "today") {
    Item.findByIdAndRemove(checkedItemId)
      .then(function(foundlist){
        res.redirect('/')
      })
  } else {
    
    List.findOneAndUpdate({name: listName}, {$pull: {listarr: {_id: checkedItemId}}})
      .then(function(foundlist){
        res.redirect('/'+ listName)
      })
  }
})

app.get('/:name', function(req, res){
  const ithemlistname = _.capitalize(req.params.name);

  List.findOne({name: ithemlistname})
  .then(function(foundlist) {
    res.render('list', {listTitle: foundlist.name, newListItems: foundlist.listarr})
  })
  .catch(function(err, foundlist) {
    const newlistitemname = new List({
      name: ithemlistname,
      listarr: ithemarray
    })
    newlistitemname.save();
    res.redirect("/"+ ithemlistname);
  });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
