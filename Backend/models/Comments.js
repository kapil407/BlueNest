import mongoose from "mongoose";
import User from "./User.js";

const commentSchema = new mongoose.Schema(
  {
    // {post->>postId->>comentId}
    post: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
