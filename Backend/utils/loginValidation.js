import validator from 'validator'

const LoginValidation=(req,res,next)=>{
        const {emailId,password}=req.body;
        if(!validator.isEmail(emailId)){
            return res.status(400).json({message:"Enter valid email"});
            
        }
        else if(!validator.isStrongPassword(password)){
            return res.status(400).json({message:"Enter strong password"});
            
        }
        next();
}
export default LoginValidation;