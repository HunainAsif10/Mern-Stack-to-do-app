const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()

const fetchUser=(req,res,next)=>{
    let token =req.header('auth-token')
    if(!token){
        res.status(401).json("Please Authenticate using a valid Token")
    }

    let data=jwt.verify(token,process.env.JWT_SEC);
    req.user=data.user;
    next()
}


module.exports={fetchUser}