const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testdb');

// const Cat = mongoose.model('Cat', { name: String , age: Number, work: String});

const fruit = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

const Fruit = mongoose.model('fruitdata', fruit);

const fruitdatatwo = new Fruit({name: 'mango', rating: 10, review: "this is a king of all fruits"});
const kiwii = new Fruit({name: 'kiwii', rating: 10, review: "this is a king of all fruits"});
const banana = new Fruit({name: 'banana', rating: 10, review: "this is a king of all fruits"});
const apple = new Fruit({name:'apple', rating: 10, review: "this is a king of all fruits"});
const pineapple = new Fruit({name: "pineapple", rating: 9, review: 'this is great fruit'});

// Fruit.insertMany([fruitdatatwo, kiwii, banana])

// banana.save();

// Fruit.find().then(function(fruits){
//     console.log(fruits)
// })



const pepoledata = mongoose.Schema({
    name: String,
    age: Number,
    favoritefruit: Fruit.schema
})

const people = mongoose.model('people', pepoledata);

const peopledatatwo = new people({name: 'john', age: 43, favoritefruit: pineapple});

// peopledatatwo.save();


Fruit.find().then(function(na){
    mongoose.connection.close();
    na.forEach(function(element){
        console.log(element.name)
    })
})


// Fruit.deleteMany({ name: "banana"})
//       .then(() => console.log('Document deleted successfully'))
//     .catch(err => console.log('Error deleting document:', err));


people.updateOne({ name:'ironman' }, { favoritefruit: banana })
  .then(function() {
    console.log('Update successful');
  })
  .catch(function(err) {
    console.log('Error during update: ', err);
  });









// const kitty = new Cat({ name: 'Zildjian' , age: 30, work: "bugger"});
// kitty.save().then(() => console.log('there is ntohgin to we can fuck up'));