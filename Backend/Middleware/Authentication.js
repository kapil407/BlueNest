import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import Tweet from '../models/Tweets.js'
import User from '../models/User.js'

const isAuthentication=async (req,res,next)=>{
            try {
               
                const cookies=req.cookies;
              
                const token=cookies.token;
                
              
                if(!token){
                    throw new Error("token is invalid");
                }
              
                const decoded= jwt.verify(token,process.env.JWT_SECRET);
                   
                   const userId =decoded.userId;
               
                   const user=await User.findOne({_id:userId});
                   if(!user){
                    throw new Error("User not found");
                    
                   }
           
                req.userId =decoded.userId;
                req.user=user;
                 
            //    console.log("userId->"+userId)
                 next();

            } 
            catch (error) {
                    return res.status(400).json({message:"kapil erro in Authentication"});
            }
}
export  default isAuthentication;