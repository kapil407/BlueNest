import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const AccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.AccessToken_Secret_Key, {
    expiresIn: "15m",
    sameSite: "None",
    secure: true,
   
  });
};
export const RefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.RefreshToken_Secret_Key, {
    expiresIn: "7d",
    sameSite: "None",
    secure: true,
  });

};
