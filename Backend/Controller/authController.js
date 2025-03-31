  import bcrypt from "bcrypt"

import User from '../models/User.js'


  
  
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
               
                res.json({ message:"signUp Successfully",data});
        }
        catch(err){
                // console.log("kapil")
                res.status(500).json({ error: err.message});
              
                
        }

}