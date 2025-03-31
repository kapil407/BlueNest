import dotenv from 'dotenv';
dotenv.config();

const LogOutController=async (req,res)=>{
            try{
                
             
                res.cookie("token",process.env.SECRET_KEY,{expire:new Date(Date.now())});
                res.json({message:"logout succesfully"});

            }
            catch(err){
                return res.status(400).json({message:err.message});
            }
}
export  default LogOutController;