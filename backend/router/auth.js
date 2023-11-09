const express = require('express')
const router = express.Router()

require("../db/connnection")
const User = require('../model/userSchema')

router.get('/' , (req,res) => {
    res.send("Hello Server")
})

router.post('/register' , (req , res) => {
    const { name , email , pwd , cpwd } = req.body
    
    //validation
    if(!name || !email || !pwd || !cpwd){
        return res.status(422).json({error: "Please Fill all the fields"})
    }

    User.findOne({email: email})
        .then( (userExist) => {
            if(userExist){
                return res.status(422).json({error: "Email already Exists"})
            }
           
            const user = new User({name , email, pwd, cpwd})
            user.save().then(() => {
                res.status(201).json({message: "User registered Succesfully"})
            }).catch((e) => res.status(500).json({error: "Failed to register"}))
            
        })
        .catch( e => { console.log(err) })
})

module.exports = router