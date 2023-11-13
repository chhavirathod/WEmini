const mongoose = require('mongoose')

require('../db/connnection')

const campaignSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    target:{
        type: Number,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    
})

const Campaign = mongoose.model('CAMPAIGN' , campaignSchema)

module.exports = Campaign