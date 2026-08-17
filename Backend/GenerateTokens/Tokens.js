import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

export const AccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.AccessToken_Secret_Key, {
    expiresIn: "15m",
   
   
  });
};
 

export const RefreshToken = (userId) => {
  return jwt.sign(
    {
      userId,
      jti: crypto.randomUUID(),
    },
    process.env.RefreshToken_Secret_Key,
    { expiresIn: "7d" }
  );
};
