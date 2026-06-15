import { useCallback } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant" 
const useGenerateAccessToken = () => {

  const generateAccessToken = useCallback(async () => {
    try { 
      const res = await axios.post(
        `${USER_API_END_POINT}/generateNewAccessToken`,
        {},
        { withCredentials: true },
      );
        console.log("res in geerateAccessToken ",res);
      
      return true
    } catch (error) {
      console.log("error in generating access token kapil", error); 
      return error.response.status;
    }
  }, []);

  return generateAccessToken;
};

export default useGenerateAccessToken;