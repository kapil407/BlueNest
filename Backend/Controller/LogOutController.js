import dotenv from 'dotenv';
dotenv.config();

const LogOutController=async (req,res)=>{
            try{
                
             
                res.cookie("token",process.env.SECRET_KEY,{expires:new Date(Date.now())});
                return res.json({message:"logout succesfully"});

            }
            catch(err){
                return res.status(400).json({message:err.message});
            }
}
export  default LogOutController;