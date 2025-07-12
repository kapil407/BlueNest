import isAuthentication from '../Middleware/Authentication.js'
import express from "express";

import { createTweetController } from "../Controller/TweetController.js";
import {deleteTweetController} from '../Controller/TweetController.js'
import { likeOrDisLikeController } from "../Controller/TweetController.js";
import { getAllTweetsController } from "../Controller/TweetController.js";
import {getfollowTweetsController} from '../Controller/TweetController.js'

const likeOrDisLikeRouter=express.Router();
const deleteTweetRouter=express.Router();
const tweetRouter=express.Router();
const allTweetsRouter=express.Router();
const followTweetsRouter=express.Router();


tweetRouter.post('/createTweet',isAuthentication ,createTweetController);
deleteTweetRouter.delete('/deleteTweet/:id',isAuthentication,deleteTweetController);
likeOrDisLikeRouter.put('/tweetLikeOrDisLike/:id',isAuthentication,likeOrDisLikeController);
allTweetsRouter.get('/allTweets',isAuthentication,getAllTweetsController);
followTweetsRouter.get('/followTweets/:id',getfollowTweetsController)


export  {tweetRouter,deleteTweetRouter,likeOrDisLikeRouter,allTweetsRouter,followTweetsRouter};