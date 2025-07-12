

import validator from 'validator';
export const SignUpValidation=(req,res,next)=>{
        // console.log("SignUpValidation")
        const {firstName,lastName,userName,emailId,password}=req.body; 
       
        if(!firstName){
                // console.log("firstname")
        return res.status(400).json({message:"Enter the firstName"});

                
        }
        else if(!lastName){
                // console.log("lastname")
                return res.status(400).json({message:"Enter lastName"});
             
                
        }
        else if(!userName || userName.length<4){
                // console.log("username")
                return res.status(400).json({message:"EnterUserName or must be grater than 4"});
          
            
        }
        else if(!validator.isEmail(emailId)){
                // console.log("emaiolId")
                return res.status(400).json({message:"Enter valid email"});
                
                
        }
        else if(!validator.isStrongPassword(password)){
                // console.log("password")
                return res.status(400).json({message:"Enter the strong password"});
           
            
        }
        
        // console.log("end of signUp validate" )
        next();
       
}