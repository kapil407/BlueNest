import express from "express";
import { resendOTP, verifyOTP } from "../Controller/UserController.js";

const OtpRouter = express.Router();

OtpRouter.post("/sendOtp", resendOTP);
OtpRouter.post("/verifyOtp", verifyOTP);

export default OtpRouter;
