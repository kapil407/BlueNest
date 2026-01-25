import bcrypt from "bcrypt";

import User from "../models/User.js";

import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Tweet from "../models/Tweets.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import crypto from "crypto";
import uploadCloudinary from "../Middleware/Cloudinary.js";

dotenv.config();

const generateOTP = () => crypto.randomInt(10000, 100000);

// console.log("generateOTP", generateOTP);

// email transport

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kapilkeer1506@gmail.com",
    pass: "kvkpdylbtubmaqgf",
  },
});

export const signUpController = async (req, res) => {
  try {
    const { firstName, lastName, userName, emailId, password } = req.body;

    const exitUser = await User.findOne({ emailId: emailId });
    if (exitUser) {
      return res.json({ message: "User already exists" });
    }

    // console.log("ifout")

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
    const data = await newUser.save();

    await transport.sendMail({
      from: "kapilkeer1506@gmail.com",
      to: emailId,
      subject: "OTP Verification",
      text: `Your OTP is : ${otp}`,
    });

    return res.status(200).json({
      message: "Register succesfully.Please verify OTP sent to your email",
      success: true,
      newUser,
    });
  } catch (err) {
    // console.log("catch")

    return res.status(400).json({ error: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    // console.log("backend", email);
    // console.log("otp from frontend", otp);

    if (!email || !otp) {
      return res.status(400).json("email is undefined");
    }

    const user = await User.findOne({ emailId: email });
    // console.log("otp in user data", user.verificationCode);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "user already verified", success: false });
    }
    // console.log("user date", user?.expiryOtp);
    // console.log("time ", new Date());

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
    const { email } = req.body;
    // console.log("email", email);
    if (!email) {
      return res.status(400).json({ message: "email is undefined" });
    }
    const user = await User.findOne({ emailId: email });
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
    await transport.sendMail({
      from: "kapilkeer1506@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is : ${otp}`,
    });

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
    // creating token for create cookie
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET); // process.env.JWT_SECRET, secret key

    return res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .json({ message: "Login successfully", user, success: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const LogOutController = async (req, res) => {
  try {
    res.cookie("token", process.env.SECRET_KEY, {
      expires: new Date(Date.now()),
    });
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

    // 1️⃣ Logged-in user ke bookmarks lao
    const user = await User.findById(userId).select("bookmarks");

    if (!user || user.bookmarks.length === 0) {
      return res.status(200).json({ tweets: [] });
    }

    // 2️⃣ Sirf wahi tweets lao jo user ke bookmarks me hain
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

    const targetUser = await User.findById(targetUserId); // the person , i follow
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
      ); // push the user's userId into following{ARRAY} of LoggedInUser
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
