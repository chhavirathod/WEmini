const jwt = require("jsonwebtoken")
const User = require("../model/userSchema")

const authenticate = (req,res,next) => {

    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);

        User.findOne({_id : verifyToken._id , "tokens.token" : token})
            .then((rootUser) => {
                if(!rootUser){
                    return res.status(401).json({message: "User Not Found"});
                }
                else{
                    req.rootUser = rootUser;
                    req.token = token;
                    req.UserID = rootUser._id;
                }
            
            })
        .catch((e) => {throw Error(e)})
    }
    catch(err){
        return res.status(401).json({message: "No Token Found"});
    }

    next();
}

module.exports = authenticate;