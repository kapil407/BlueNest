import bcrypt from "bcrypt";
import axios from "axios";
import User from "../models/User.js";

import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Tweet from "../models/Tweets.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import crypto from "crypto";
import uploadCloudinary from "../Middleware/Cloudinary.js";
import AccessToken from "../GenerateTokens/Tokens.js";
import RefreshToken from "../GenerateTokens/Tokens.js";

dotenv.config();

const generateOTP = () => crypto.randomInt(10000, 100000);

export const signUpController = async (req, res) => {
  try {
    const { firstName, lastName, userName, emailId, password } = req.body;

    const exitUser = await User.findOne({ emailId: emailId });
    if (exitUser) {
      return res.json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const now = new Date();
    const ExpiryOtp = new Date(Date.now() + 60 * 1000 * 2);

    const newUser = new User({
      /// create a newUser by User Model
      firstName,
      lastName,
      emailId,
      userName,
      password: hashPassword,
      otpVerified: false,
      expiryOtp: ExpiryOtp,
      verificationCode: otp,
    });

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "kapilkeer1998@gmail.com",
        },
        to: [
          {
            email: emailId,
          },
        ],
        subject: "BlueNest - Email Verification OTP",
        htmlContent: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
  <h2 style="color: #2563eb;">BlueNest Email Verification</h2>

  <p>Hello,</p>

  <p>
    Thank you for signing up with <strong>BlueNest</strong>.
    Please use the following One-Time Password (OTP) to verify your email address:
  </p>

  <div style="text-align: center; margin: 25px 0;">
    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb;">
      ${otp}
    </span>
  </div>

  <p>
    This OTP is valid for <strong>2 minutes</strong>.
  </p>

  <p>
    If you did not request this verification, please ignore this email.
    No further action is required.
  </p>

  <hr />

  <p style="color: #666; font-size: 12px;">
    This is an automated message. Please do not reply to this email.
  </p>

  <p>
    Regards,<br/>
    <strong>BlueNest Team</strong>
  </p>
</div>
`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Mail Sent");

    await newUser.save();

    return res.status(200).json({
      message: "Register succesfully.Please verify OTP sent to your email",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log("catch in signup ", error);

    return res.status(400).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const otp = req.body.otp;
    console.log("backend", emailId);

    if (!emailId || !otp) {
      return res.status(400).json("email is undefined");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "user already verified", success: false });
    }

    if (user.verificationCode != otp || user.expiryOtp < new Date()) {
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP", success: false });
    }
    user.otpVerified = true;
    user.verificationCode = undefined;
    user.expiryOtp = undefined;
    await user.save();
    return res.status(200).json({
      message: "Email verified successfully .You can now log in",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { emailId } = req.body;
    console.log("email", emailId);
    if (!emailId) {
      return res.status(400).json({ message: "email is undefined" });
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "user already verified" });
    }
    const otp = generateOTP();

    user.verificationCode = otp;

    const expires = new Date(Date.now() + 2 * 60 * 1000);
    user.expiryOtp = expires;
    await user.save();

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "kapilkeer1998@gmail.com",
        },
        to: [
          {
            email: emailId,
          },
        ],
        subject: "BlueNest - Email Verification OTP",
        htmlContent: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
  <h2 style="color: #2563eb;">BlueNest Email Verification</h2>

  <p>Hello,</p>

  <p>
    Thank you for signing up with <strong>BlueNest</strong>.
    Please use the following One-Time Password (OTP) to verify your email address:
  </p>

  <div style="text-align: center; margin: 25px 0;">
    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb;">
      ${otp}
    </span>
  </div>

  <p>
    This OTP is valid for <strong>2 minutes</strong>.
  </p>

  <p>
    If you did not request this verification, please ignore this email.
    No further action is required.
  </p>

  <hr />

  <p style="color: #666; font-size: 12px;">
    This is an automated message. Please do not reply to this email.
  </p>

  <p>
    Regards,<br/>
    <strong>BlueNest Team</strong>
  </p>
</div>
`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Mail Sent");

    console.log("otp resend", otp, user.verificationCode);

    return res
      .status(200)
      .json({ message: "OTP resent successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Search User in data
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const userPassword = user.password;

    const isMatch = await bcrypt.compare(password, userPassword); // compare the password of inputPassword with exist password
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }

    if (!user.otpVerified) {
      return res.status(400).json({
        message: "Email is not verified .Please verify OTP",
        success: false,
      });
    }

    // creating tokein rotation  for security
    const accessToken = AccessToken(user?._id);
    const refreshToken = RefreshToken(user?._id);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const DeviceInfo = req.headers["user-agent"] || "Unknown Device";
    user.RefreshToken.push({
      token: hashedRefreshToken,
      Device: DeviceInfo,
      createAt: Date.now(),
    });
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "kapilkeer1998@gmail.com",
        },
        to: [
          {
            email: emailId,
          },
        ],

        subject: "BlueNest - Login Alert",
        htmlContent: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
  <h2 style="color: #2563eb;">BlueNest Login Alert</h2>

  <p>Hello,</p>

  <p>
    We detected a successful login to your <strong>BlueNest</strong> account.
  </p>

  <p>
    If this was you, no further action is required and you can safely ignore this email.
  </p>

  <p>
    If you do not recognize this login, please secure your account immediately by changing your password and reviewing your account activity.
  </p>

  <div style="background-color: #f4f7fb; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #2563eb;">Login Details</h3>

    <p><strong>Device:</strong> ${DeviceInfo}</p>
   
  </div>

  <p>
    For your security, we recommend using a strong password and keeping your account credentials private.
  </p>

  <hr />

  <p style="color: #666; font-size: 12px;">
    This is an automated security notification from BlueNest. Please do not reply to this email.
  </p>

  <p>
    Regards,<br/>
    <strong>BlueNest Team</strong>
  </p>
</div>
`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.json({ message: "Login successfully", user, success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const LogOutController = async (req, res) => {
  try {
    const refreshtoken = req.cookies;

    const decoded = await jwt.verify(
      refreshtoken,
      process.env.RefreshToken_Secret_Key,
    );
    const user = await User.findById(decoded.user._id);

    const filteredTokens = [];
    let isTokenMatched = false;

    for (const tokenData of user.RefreshToken) {
      const isMatch = await bcrypt.compare(refreshToken, tokenData.token);
      if (!isMatch) {
        filteredTokens.push(tokenData);
        isTokenMatched = true;
      }
    }
    if (!isTokenMatched) {
      res.clearCookies("accessToken");
      res.clearCookies("refreshToken");
      return res.status(400).json({ message: "Invalid refresh token" });
    }
    user.RefreshToken = filteredTokens;
    await user.save();
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ message: "logout succesfully", success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// for updating the profile so we have to first fetch the profile from DB

export const editProfileController = async (req, res) => {
  try {
    const userId = req.userId;
    const loggedinUser = req.user;
    const allowedForEdit = ["firstName", "lastName", "userName", "bio"];

    const isValidUpdate = Object.keys(req.body).every((key) =>
      allowedForEdit.includes(key),
    );
    if (!isValidUpdate) {
      return res.json({ message: "Not permissible to edit" });
    }

    let imageUrl = null;

    if (req.file) {
      console.log("image in backend", req.file);

      imageUrl = await uploadCloudinary(req.file.path);

      loggedinUser.profilePic = imageUrl;
    }

    Object.keys(req.body).forEach(
      (field) => (loggedinUser[field] = req.body[field]),
    );

    const updated = await loggedinUser.save();
    // console.log("updated", updated.profilePic);

    await Tweet.updateMany(
      { userId },
      {
        $set: {
          "userDetails.0.firstName": updated.firstName,
          "userDetails.0.lastName": updated.lastName,
          "userDetails.0.userName": updated.userName,
          "userDetails.0.bio": updated.bio,
          "userDetails.0.profilePic": updated.profilePic,
        },
      },
    );

    return res.json({
      message: "Profile updated successfully",
      updated,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const bookmarksController = async (req, res) => {
  try {
    const userId = req.userId;

    const tweetId = req.params.id;

    const loggedInUser = await User.findById(userId);
    const tweet = await Tweet.findById(tweetId);

    let updatedUserData;
    let bookmarkCnt = 0;
    if (loggedInUser.bookmarks.includes(tweetId)) {
      updatedUserData = await User.findByIdAndUpdate(
        userId,
        { $pull: { bookmarks: tweetId } },
        { new: true },
      );
      bookmarkCnt--;
      if (bookmarkCnt < 0) {
        bookmarkCnt = 0;
      }

      return res.json({
        message: " remove bookmarks successfully",
        updatedUserData,
        bookmarkCnt,
      });
    } else {
      updatedUserData = await User.findByIdAndUpdate(
        userId,
        { $push: { bookmarks: tweetId } },
        { new: true },
      );
      bookmarkCnt++;
      return res.json({
        message: " bookmarks successfully",
        updatedUserData,
        bookmarkCnt,
      });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
export const getBookmarksTweetsController = async (req, res) => {
  try {
    const userId = req.userId;

    // 1️Logged-in user ke bookmarks lao
    const user = await User.findById(userId).select("bookmarks");

    if (!user || user.bookmarks.length === 0) {
      return res.status(200).json({ tweets: [] });
    }

    // 2️ Sirf wahi tweets lao jo user ke bookmarks me hain
    const tweets = await Tweet.find({
      _id: { $in: user.bookmarks },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ tweets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProfileController = async (req, res) => {
  try {
    //   const user=req?.user;
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    return res.json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getOthersProfileController = async (req, res) => {
  try {
    const userId = req.userId;

    const otherUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password",
    );
    if (!otherUsers) {
      return res.status(400).json({ message: "there is not User" });
    }
    return res.json({ message: "get OtherUsersProfile", otherUsers });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const FollowingController = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const loggedInUserId = req.userId;
    const following = loggedInUser?.following;

    const targetUserId = req.params.id;

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.json({ message: "user not found" });
    }
    const followers = targetUser?.followers;
    let updatedData;
    if (!following.includes(targetUserId)) {
      updatedData = await User.findByIdAndUpdate(
        loggedInUserId,
        {
          $push: { following: targetUserId },
        },
        { new: true },
      );
      await User.findByIdAndUpdate(
        targetUserId,
        { $push: { followers: loggedInUserId } },
        { new: true },
      ); // push the loggedInUserId of loggedInUser into followers{ARRAY} of user
      return res.json({
        message: `You just follow ${targetUser.firstName}`,
        success: true,
        updatedData,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const unFollowController = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const loggedInUserId = req.userId;
    const following = loggedInUser?.following;

    const targetUserId = req.params.id;

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.json({ message: "user not found" });
    }
    const followers = targetUser?.followers;

    if (following.includes(targetUserId)) {
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { following: targetUserId },
      }); // pull the user userId from following{ARRAY} of LoggedInUser
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: loggedInUserId },
      }); // pull the loggedInUserId of loggedInUser from followers{ARRAY} of user
      return res.json({
        message: `You unfollow  ${targetUser.firstName}`,
        success: true,
      });
    }

    // return res.json({message:`${user.firstName} has not follwed yet`});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const changeBackgroundImage = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadCloudinary(req.file.path);
    }
    user.backGroundImage = imageUrl;

    const updated = await user.save();
    return res.status(200).json({
      message: "BackGroundImage updated",
      updated,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: error, success: false });
  }
};
