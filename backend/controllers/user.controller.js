const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../model/userSchema');
const Campaign = require('../model/campaignSchema');

const login = (req , res) => {
    const { email , pwd } = req.body 
    // console.log(req.body)

    //validation
    function validateEmail(email) {
        const regex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    if(!email || !pwd){
        return res.status(401).json({error : "Please fill all the fields!"})
    }
    if(!validateEmail(email)){
        return res.status(401).json({error: "Invalid Email"})
    }

    //Checking existing User
    User.findOne({email : email})
        .then(async (userExist) => {      //userExist contains details of the found user or NULL value
            if(userExist){
                bcrypt.compare( pwd , userExist.pwd)
                    .then((isMatch) =>{
                        if(!isMatch)
                            res.status(401).json({message: "Wrong Password"})
                        else
                            res.status(200).json({message: "Login Successfull", loggedUser: userExist})
                    }).catch(e => console.log(e))

                const token = await userExist.generateAuthToken();
                console.log(token)
                
                //cookie
                res.cookie("jwtoken" , token , { 
                    expires: new Date(Date.now() + 3600000),
                    path: "/",
                    domain:"localhost",
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
            }
            else
                res.status(401).json({message: "Couldnt find the User"})
        })
        .catch((e) => {
            console.log(e)
        })
}

const register = (req , res) => {
    const { name , email , pwd , cpwd } = req.body
    
    //validation
    function validateEmail(email) {
        const regex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    if(!validateEmail(email)){
        return res.status(401).json({message: "Invalid Email"})
    }

    //Checking existing User
    User.findOne({email: email})
        .then( (userExist) => {
            if(userExist){
                return res.status(401).json({message: "Email already Exists"})
            }

            else if(pwd != cpwd){
                return res.status(401).json({message: "Confirm Password not equal"})
            }

            const user = new User({name , email, pwd, cpwd})
            
            user.save().then(() => {
                res.status(201).json({message: "User registered Succesfully"})
            }).catch((e) => res.status(500).json({message: "Failed to register"}))
            
        })
        .catch( e => { console.log(e) })
}

const profile = (req,res) => {
    return res.send(req.rootUser);
}

const viewAllUsers = (req,res) =>{
    User.find()
        .then((users) =>{
            res.send(users)
        })
        .catch((err) => console.log(err))
}

const logout = (req,res) => {
    res.clearCookie("jwtoken", {path: "/",domain:"localhost", httpOnly: true, secure: true, sameSite:"none" });
    res.status(200).json({message:"Logged out Successfully!"})
    return res.status(200).send('Logged out');
}

const checkLoggedUser = (req,res) => {
    if (req.rootUser)
        return res.status(200).json({message: 'User is logged in', user: req.rootUser})
    else
        return res.status(401).json({message: 'No User Logged in'})
}


module.exports={
    login,
    register,
    profile,
    viewAllUsers,
    logout,
    checkLoggedUser,
}