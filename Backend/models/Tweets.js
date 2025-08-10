import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    likes: {
      type: Array, //to store likes and return the length of array
      default: [],
    },

    userId: {
      type: mongoose.Schema.ObjectId, // userid of that person wwho create new tweet
      ref: "User", // refer the model of that person
    },
    userDetails: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      maxLength: [120, "not more than 120"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const Tweet = mongoose.model("Tweet", tweetSchema); // tweet model
export default Tweet;
