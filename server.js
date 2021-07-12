const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require("passport");
const session = require("express-session");


const userRouter = require('./routes/user')
// const placeRouter = require('./routes/place')

require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8080

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/placesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Database')
})



app.use('/user', userRouter)
// app.use('/place', placeRouter)

app.listen(port, function(){
    console.log("The server is running on PORT " + port);
})