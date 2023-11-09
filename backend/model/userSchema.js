const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    pwd:{
        type: String,
        required: true
    },
    cpwd:{
        type: String,
        required: true
    },
})

const User = mongoose.model('USER' , userSchema)

module.exports = User