import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGenerateAccessToken from "../GenerateAccessToken/useTokenRotation.js";

const TokenRotation = () => {
  const navigate = useNavigate();
  const generateNewAccessToken = useGenerateAccessToken();

  useEffect(() => {
    const refreshAccessToken = async () => {
      const status = await generateNewAccessToken();

      if (status === 401) {
        navigate("/login");
      }
    };

    // Har 14 minutes

    const intervalId = setInterval(refreshAccessToken, 1 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default TokenRotation;
