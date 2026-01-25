import mongoose from "mongoose";
import User from "./User.js";
const tweetSchema = new mongoose.Schema(
  {
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId, // userid of that person wwho create new tweet
      ref: "User", // refer the model of that person
    },
    userDetails: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      maxLength: [400, "not more than 120"],
    },
    image: {
      url: String,
      publicId: String,
    },
    video: {
      url: String,
      publicId: String,
      duration: Number,
    },
  },
  {
    timestamps: true,
  },
);
const Tweet = mongoose.model("Tweet", tweetSchema); // tweet model
export default Tweet;
