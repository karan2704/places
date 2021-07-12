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


userRouter.post('/register', (req, res, next) => {
  const {username, password} = req.body

  User.register({username: username}, password, function(err, user) {
    if(err){
      res.status(500).json({
          err: true,
          message: "Interval server error"
      })
    }else{
      passport.authenticate("local")(req, res, function(){
        console.log(user);
      })
      res.status(200).json({
        err: false,
        message: user
      })
    }
    next()
  })
})

userRouter.post('/login', (req, res, next) => {
   console.log('yo');
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    req.login(user, (err) => {
      if(err) {
        res.status(500).json({
          err: true,
          message: "Interval server error"
      })
      console.log(err);
      } else {
        passport.authenticate("local", (req, res) => {
          console.log(user);
        })
        res.status(200).json({
          err: false,
          message: user
        })
      }
    })
})

userRouter.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = userRouter



// userRouter.post('/register', (req, res, next) => {
//   const {username, password} = req.body

//   User.register({username: username}, password, function(err, user) {
//     if(err){
//       res.status(500).json({
//           err: true,
//           message: "Interval server error"
//       })
//     }else{
//       res.status(200).json({
//         err: false,
//         message: user
//       })
//     }
//     next()
//   })
// })