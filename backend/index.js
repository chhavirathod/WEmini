const express = require('express');
const dotenv = require('dotenv')
const app = express();

require('./db/connnection')

app.get('/' , (req,res) => res.send("Hello"));

app.listen( 5000 , () => console.log('port 5000 running') );
