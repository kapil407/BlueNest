import { useCallback } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";

const useGenerateAccessToken = () => {
  const generateAccessToken = useCallback(async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/tokens/generateNewAccessToken`,
        {},
        { withCredentials: true },
      );

      return res?.data?.accessToken;
    } catch (error) {
      console.log("error in generating access token", error);
    }
  }, []);

  return generateAccessToken;
};

export default useGenerateAccessToken;