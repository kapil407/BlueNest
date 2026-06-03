import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcrypt";    
dotenv.config();
import { AccessToken, RefreshToken } from "../GenerateTokens/Tokens.js";

const GenerateAccessToken = async (req, res) => {
  try {
    const refreshtoken = req?.cookies?.refreshToken;

    if (!refreshtoken) {
      return res
        .status(401)
        .json({ message: "Refresh token not found , please login again" });
    }
    const decoded = jwt.verify(
      refreshtoken,
      process.env.RefreshToken_Secret_Key,
    );
    const userId = decoded.userId;

    const user = await User.findById({ _id: userId });
    let isValidToken = false;
    const tokenData=[];
    for (const token of user.RefreshToken) {
      const isMatched = await bcrypt.compare(refreshtoken, token.token);
      if (!isMatched) {
        tokenData.push(token);
      }
      else {
        isValidToken = true;
      }
    }

    if (!isValidToken) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token, please login again" });
    }
    const newAccessToken = AccessToken(userId);
    const newRefreshToken = RefreshToken(userId);
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
      user.RefreshToken = tokenData;
    user.RefreshToken.push({ token: hashedRefreshToken });  
   
    await user.save();
   

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
       secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.log("Error in GenerateAccessToken:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default GenerateAccessToken;
