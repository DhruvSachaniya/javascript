require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({urlencoded: true}))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

////////////// database activity ///////////////////////
mongoose.connect('mongodb://127.0.0.1:27017/UserDB');

const userschema = mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
})

userschema.plugin(passportLocalMongoose);
userschema.plugin(findOrCreate);

const User = mongoose.model('User', userschema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/submit', function(req, res){
    if (req.isAuthenticated()){
        res.render('submit');
    } else {
        res.redirect('/login');
    }
})

app.post('/submit', function(req, res){
    const submitedpost = req.body.secret;
    console.log(req.user)
    User.findById(req.user.id).then(function(founduser){
        if(founduser){
            console.log(founduser);
            founduser.secret = submitedpost;
            founduser.save().then(function(){
            res.redirect('/secrets');
            })
        }
    })
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/logout', function(req, res){
    req.logout(function(err){
        console.log('suc')
    });
    res.redirect('/');
})

app.get('/secrets', function(req, res){
    User.find({"secret": {$ne: null}}).then(function(founduser){
        if(founduser){
            res.render('secrets', {usersWithdSecrets: founduser});
        }
    })
});

app.post('/register', function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secrets');
            })
        }
    })
})

app.post('/login', function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secrets');
            })
        }
    })
})

app.listen(3000, function(req, res){
    console.log("server is running on post 3000")
})
