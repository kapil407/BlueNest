import express from "express";
import isAuthentication from "../Middleware/Authentication.js";
import {CommentController,getComments} from "../Controller/Comment.js";
import {DeleteComment,likeOrdislikeComment} from "../Controller/Comment.js";

const router=express.Router();
router.post("/add/:postId",isAuthentication,CommentController);
router.get("/:postId",isAuthentication,getComments);
router.delete("/deleteComment/:commentId",isAuthentication,DeleteComment);
router.post("/:commentId",isAuthentication,likeOrdislikeComment);

export default router;
