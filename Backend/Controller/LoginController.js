import bcrypt from 'bcrypt'
import User from '../models/User.js'
import cookie from 'cookie-parser'
import jwt from 'jsonwebtoken'



const LoginController=async (req,res)=>{

    try{ 
    const {emailId,password}=req.body
        // Search User in data
        const exitUser=await User.findOne({emailId:emailId})
        const userPassword=exitUser.password;
        if(!exitUser){
            res.status(400).json({message:"User not found"});
        }
        const decoded=await bcrypt.compare(password,userPassword);  // compare the password of inputPassword with exit password
        const token= jwt.sign({userId:exitUser._id},"kapil@123$#@");

        res.cookie("token",token);
        res.json({message:"Login successfully"});
    }
     catch(err){
            res.status(400).json({message:err.message});
        }

}
export default LoginController;