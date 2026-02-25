 import Comments from "../models/Comments.js";
 export const CommentController=async (req, res) => {
 try {
  // console.log("tweetid->>",req.params.postId);
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
    
   return  res.status(200).json({message:"comment added",comment,success:true});
 } catch (error) {
    console.log("error in commentController",error);
 }
};
export const getComments= async (req, res) => {
  try {
    const user=req.user;
    const comments = await Comments.find({ post: req.params.postId })
      .populate("user", "name profilePic")
      .sort({ createdAt: -1 });
      const Length=comments.length;
  
   return  res.status(200).json({comments,user,Length});
  } catch (error) {
    console.log("error get Comment",error);
  }
};
const DeleteComment=async()=>{
  try {
      const id=req.params.postId;
      const comment=await Comments.findByIdAndDelete(id);
      if(!comment){
        return res.status(404).json({message:"comment is not found "});
      }
      return res.status(200).json({message:"comment delete successfully"});
  } catch (error) {
    return res.status(500).json({message:"error in comment delete",error});
  }
}
export default DeleteComment;