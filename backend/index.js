const express = require('express');
const app = express();
const dotenv = require('dotenv')

dotenv.config({ path: './config.env'})
const PORT = process.env.PORT

require('./db/connnection')
// const User = require('./model/userSchema')

app.use(express.json())

app.use(require('./router/auth'))

// app.get('/' , (req,res) => res.send("Hello"));

app.listen( PORT , () => console.log(`port ${PORT} running`) );