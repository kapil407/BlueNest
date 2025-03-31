import bcrypt from 'bcrypt'
import User from '../models/User.js'
import cookie from 'cookie-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


const LoginController=async (req,res)=>{

    try{ 
    const {emailId,password}=req.body
        // Search User in data
        const exitUser=await User.findOne({emailId:emailId})
        const userPassword=exitUser.password;
        if(!exitUser){
           return res.status(400).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,userPassword);  // compare the password of inputPassword with exit password
            if(!isMatch){
                res.status(400).json({message:"incorrect password"});
            }
        // creating token for create cookie 
        const token= jwt.sign({userId:exitUser._id}, process.env.JWT_SECRET); // process.env.JWT_SECRET, secret key 

        // send cookie as identity card
        res.cookie("token",token);
        res.json({message:"Login successfully"});
    }
     catch(err){
           return  res.status(400).json({message:err.message});
        }

}
export default LoginController;