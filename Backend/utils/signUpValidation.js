import validator from 'validator';
export const validationSignUp=(req,res,next)=>{
        const {firstName,lastName,emailId,password,userName}=req.body;    
        if(!firstName){
        throw new Error("Enter firstName");
                
        }
        else if(!lastName){
                throw new Error("Enter lastName");
                
        }
        else if(!validator.isEmail(emailId)){
                throw new Error("Enter valid email");
                
        }
        else if(!validator.isStrongPassword(password)){
            throw new Error("Enter the strong password");
            
        }
        else if(!userName || userName.length<4){
            throw new Error("Enter UserName or must be grater than 4");
            
        }
        next();
       
}