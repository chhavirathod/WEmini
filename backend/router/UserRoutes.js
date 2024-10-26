const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()


require("../db/connnection");
const authenticate = require('../middleware/authenticate');
const { checkLoggedUser, profile, logout, register, login, viewAllUsers } = require('../controllers/user.controller')

router.get('/viewAllUsers', viewAllUsers)

router.get('/currentUser' ,authenticate, (req,res) => {
    res.status(200).send(req.rootUser)
})

router.get('/checkLoggedUser' , authenticate , checkLoggedUser)

router.get('/profile' , authenticate , profile)

router.post('/logout' , logout)

router.post('/register' , register)

router.post('/login' , login)

module.exports = router