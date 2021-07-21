const passport = require("passport");
const express = require("express");
const User = require("../models/userSchema");

userRouter = express.Router()

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


userRouter.post('/register', async (req, res, next) => {
  console.log(req.body);
  const user= await new User({username : username});

  User.register(user, password, function(err, user) {
    if(err){
      res.status(500).json({
          err: true,
          message: "Interval server error"
      })
    }else{
      res.status(200).json({
        err: false,
        message: 'User registered successfully'
      })
    }
    next()
  })
})

userRouter.post('/login', async (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    req.login(user, function(err){
      if(err){
        res.status(500).json({
          err: true,
          message: 'Server error, Try again later.'
        })
      } else{
        passport.authenticate('local')(req, res, function(){
          res.status(200).json({
            err: false,
            message: user
          })
        })
      }
    })
  })
        
      

userRouter.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = userRouter;
    
