import isAuthentication from '../Middleware/Authentication.js'
import express from "express";
import multer from "multer";

import { createTweetController } from "../Controller/TweetController.js";
import {deleteTweetController} from '../Controller/TweetController.js'
import { likeOrDisLikeController } from "../Controller/TweetController.js";
import { getAllTweetsController } from "../Controller/TweetController.js";
import {getfollowTweetsController} from '../Controller/TweetController.js'

const router=express.Router();



const storage = multer.memoryStorage(); // Memory storage for Cloudinary
const upload = multer({ storage });

router.post("/createTweet", upload.single("image"),isAuthentication, createTweetController);


// router.post('/createTweet',isAuthentication ,createTweetController);
router.delete('/deleteTweet/:id',isAuthentication,deleteTweetController);
router.put('/tweetLikeOrDisLike/:id',isAuthentication,likeOrDisLikeController);
router.get('/allTweets',isAuthentication,getAllTweetsController);
router.get('/followTweets/:id',getfollowTweetsController)


export  default router;