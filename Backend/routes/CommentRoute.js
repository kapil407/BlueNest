import express from "express";
import isAuthentication from "../Middleware/Authentication.js";
import {CommentController,getComments} from "../Controller/Comment.js";
import DeleteComment from "../Controller/Comment.js";

const router=express.Router();
router.post("/comments/add/:postId",isAuthentication,CommentController);
router.get("/comments/:postId",isAuthentication,getComments);
router.delete("/:postId",isAuthentication,DeleteComment);
export default router;