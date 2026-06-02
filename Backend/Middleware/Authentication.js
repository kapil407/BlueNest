import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import Tweet from "../models/Tweets.js";
import User from "../models/User.js";

const isAuthentication = async (req, res, next) => {
  try {
    const AccessToken = req.cookies.accessToken;

    if (!AccessToken) {
      throw new Error("token is invalid");
    }

    const decoded = jwt.verify(AccessToken, process.env.AccessToken_Secret_Key);

    const userId = decoded.userId;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    req.userId = decoded.userId;
    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export default isAuthentication;
