import validator from 'validator'

const LoginValidation=(req,res,next)=>{
        const {emailId,password}=req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Enter the valid email");
            
        }
        else if(!validator.isStrongPassword(password)){
            throw new Error("Enter the strong password ");
            
        }
        next();
}
export default LoginValidation;