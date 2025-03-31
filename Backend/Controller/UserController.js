import bcrypt from "bcrypt"

import User from '../models/User.js'


import cookie from 'cookie-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


  
  
  export const signUpController= async (req,res)=>{
        try{       
              
        const {firstName,lastName, emailId ,userName , password}=req.body;

        const exitUser=await User.findOne({emailId:emailId});
        if(exitUser){
                res.json({message:"User already exists"});
        }
        // console.log(req.body)
      
                const hashPassword=await bcrypt.hash(password,10);  
               
                const newUser=new User({   /// create a newUser by User Model
                        firstName,
                        lastName,
                        emailId,
                        userName,
                        password:hashPassword
                });

                

             const data=   await newUser.save();
               
               return  res.json({ message:"signUp Successfully",data});
        }
        catch(err){
                // console.log("kapil")
               return res.status(500).json({ error: err.message});
              
                
        }

} 




export const LoginController=async (req,res)=>{

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




export const LogOutController=async (req,res)=>{
            try{
                
             
                res.cookie("token",process.env.SECRET_KEY,{expires:new Date(Date.now())});
                return res.json({message:"logout succesfully"});

            }
            catch(err){
                return res.status(400).json({message:err.message});
            }
}
