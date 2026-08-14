import Comments from "../models/Comments.js";

import mongoose from "mongoose";
export const CommentController = async (req, res) => {
  try {
    // console.log("tweetid->>",req.params.postId);
    if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
      return res
        .status(400)
        .json({ message: "Invalid post id", success: false });
    }
    if (!req.body?.addComment || req.body.addComment.trim().length === 0) {
      return res.status(400).json({
        message: "Write something",
        success: false,
      });
    }
    const comment = await Comments.create({
      post: req.params.postId,
      user: req.userId,
      text: req.body.addComment,
    });

    return res
      .status(200)
      .json({ message: "comment added", comment, success: true });
  } catch (error) {
    console.log("error in commentController", error);
  }
};
export const getComments = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
      return res
        .status(400)
        .json({ message: "Invalid post id", success: false });
    }
    const user = req.user;
    const comments = await Comments.find({ post: req.params.postId })
      .populate("user", "firstName userName profilePic")
      .sort({ createdAt: -1 });
    const Length = comments.length;

    return res.status(200).json({ comments, user, Length });
  } catch (error) {
    console.log("error get Comment", error);
  }
};
export const DeleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res
        .status(400)
        .json({ message: "Invalid comment id", success: false });
    }

    const comment = await Comments.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ message: "comment is not found", success: false });
    }

    if (comment.user.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this comment",
        success: false,
      });
    }

    await Comments.findByIdAndDelete(commentId);

    return res
      .status(200)
      .json({ message: "comment delete successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in comment delete", success: false });
  }
};
 
export const likeOrdislikeComment=async(req,res)=>{
  try {
      const {commentId}=req.params;
      if(!mongoose.Types.ObjectId.isValid(commentId)){
        return res.status(400).json({mesage:"commentid is not valid "})
      }
        const comment=await Comments.findById(commentId);
        if(!comment.likes.includes(req.userId)){
          comment.likes.push(req.userId);
             await comment.save();
          return res.status(200).json({message:"Like comment",comment});
        }
        else{
           comment.likes.pull(req.userId);
              await comment.save();
           return res.status(200).json({message:"Dislike comment",comment});
        }
     

  } catch (error) {
      return res.status(500).json({mesage:"error in like comment",error});
  }
}




