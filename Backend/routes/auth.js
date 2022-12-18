const express=require('express')
const router=express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// createUser
router.post('/createUser',[ 
    body('name','Name Must be 3 Characters').isLength({min:3}),
    body('email','Enter A Valid Email').isEmail(),
    body('password','Password Atleast % characters').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

        let user=await User.findOne({email:req.body.email})
        if(user){
            success=false;
            res.status(401).json("User with this email already exists")
            
        }
        const salt =await bcrypt.genSalt(10);
       const hash =await  bcrypt.hash(req.body.password, salt);
        user= User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
          })
          const data={
            user:{
                id:user.id,
                isAdmin:user.isAdmin
            }
          }
          const token = jwt.sign(data,process.env.JWT_SEC);
       success=true
          res.status(200).json({success,token})

        
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

// loginUser

router.post('/loginUser',[
    body('email','Enter A Valid Email').isEmail(),
    body('password','Password Atleast % characters').exists(),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {email,password}=req.body;
    
    try {
        let user=await User.findOne({email})
    

        
        if(!user){
            success=false;
            res.status(400).json("Please Login using Correct Email Credentials")
        }
        // let passwordCompare=await bcrypt.compare(password,user.password) 
        let passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false
            res.status(400).json("Please Login using Correct pass Credentials")  
        }
        const data={
            user:{
                id:user.id,
                isAdmin:user.isAdmin
            }
          }
          const token = jwt.sign(data,process.env.JWT_SEC);
          success=true
          res.status(200).json({success,token})


        
    } catch (error) {
        res.status(500).json("Internal Server Error")
        
    }
})

module.exports=router