const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    hashedPassword: {
        type: String,
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
    }]    
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)