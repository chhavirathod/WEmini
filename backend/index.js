const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const cookie_parser = require('cookie-parser')

const corsOptions ={
    origin:['https://venturecrowd.vercel.app', 'http://localhost:5173'], 
    allow_methods: ["POST","GET"],
    credentials:true,              //access-control-allow-credentials:true
    optionSuccessStatus:200
}
dotenv.config({ path: './.env'})
const PORT = process.env.PORT

require('./db/connnection')
// const User = require('./model/userSchema')
app.use(cors(corsOptions))
app.use(cookie_parser())
app.use(express.json())

app.use(require('./router/UserRoutes'))
app.use(require('./router/CampaignRoutes'))

app.get('/' , (req,res) => res.send("Hello"));

app.listen( PORT , () => console.log(`port ${PORT} running`) );