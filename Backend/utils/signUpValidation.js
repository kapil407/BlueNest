import validator from 'validator';
export const validationSignUp=(req,res,next)=>{
        const {firstName,lastName,emailId,password,userName}=req.body;    
        if(!firstName){
        return res.status(400).json({message:"Enter the firstName"});
                
        }
        else if(!lastName){
                return res.status(400).json({message:"Enter lastName"});
             
                
        }
        else if(!validator.isEmail(emailId)){
                return res.status(400).json({message:"Enter valid email"});
                
                
        }
        else if(!validator.isStrongPassword(password)){
                return res.status(400).json({message:"Enter the strong password"});
           
            
        }
        else if(!userName || userName.length<4){
                return res.status(400).json({message:"EnterUserName or must be grater than 4"});
          
            
        }
        next();
       
}