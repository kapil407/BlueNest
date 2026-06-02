import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";

const useGenerateAccessToken = () => {
    
    const generateAccessToken = async () => {
        try{
            const res=await axios.post(`${USER_API_END_POINT}/tokens/generateNewAccessToken`,{},{
                withCredentials:true
            })
            console.log("res in generating access token",res);
             return res?.data?.accessToken;
        }
        catch(error){
                console.log("error in generating access token",error);
        }
    }
    return generateAccessToken;
}
export default useGenerateAccessToken;