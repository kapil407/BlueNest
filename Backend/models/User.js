import mongoose from "mongoose";

import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, "firstName should be greater than 4"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [4, "LastName should be greater than 4"],
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid emailId");
        }
      },
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],

    bio: {
      type: String,
      default: "Hey there! I'm new here",
    },
    profilePic: {
      url: String,
      publicId: String,
    },
    backGroundImage: {
      url: String,
      publicId: String,
    },
    otpVerified: {
      type: Boolean,
      Default: false,
    },
    expiryOtp: {
      type: Date,
    },
    verificationCode: String,
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userSchema); // User id model
export default User;
