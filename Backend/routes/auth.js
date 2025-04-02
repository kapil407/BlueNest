import { validationSignUp } from "../utils/signUpValidation.js";
import express from "express";
import loginValidation from '../utils/loginValidation.js'
import isAuthentication from '../Middleware/Authentication.js'

import  {signUpController,LoginController,LogOutController,
    editProfileController,bookmarksController,getProfileController ,getOthersProfileController} from "../Controller/UserController.js";

import { createTweetController } from "../Controller/TweetController.js";
import {deleteTweetController} from '../Controller/TweetController.js'
import { likeOrDisLikeController } from "../Controller/TweetController.js";
// import { bookmarksController } from "../Controller/UserController.js";
// import { getProfileController } from "../Controller/UserController.js";


const signUpRouter=express.Router();
const loginRouter=express.Router();
const logOutRouter=express.Router();
const TweetRouter=express.Router();
const DeleteRouter=express.Router();
const likeOrDisLikeRouter=express.Router();
const editProfileRouter=express.Router();
const bookmarksRouter=express.Router();
const getProfileRouter=express.Router();
const getOthersProfileRouter=express.Router();


 signUpRouter.post('/signUp', validationSignUp,signUpController); // signup API
loginRouter.post('/login',loginValidation,LoginController); // login api
logOutRouter.post('/logout',LogOutController);
TweetRouter.post('/createTweet',isAuthentication ,createTweetController);
TweetRouter.delete('/deleteTweet/:id',isAuthentication,deleteTweetController);
likeOrDisLikeRouter.patch('/tweetLikeOrDisLike/:id',isAuthentication,likeOrDisLikeController);
editProfileRouter.patch('/updateProfile',isAuthentication,editProfileController);
bookmarksRouter.patch('/bookmarkstweet/:id',isAuthentication,bookmarksController);
getProfileRouter.get('/getProfile',isAuthentication,getProfileController);
getOthersProfileRouter.get('/getOthersProfile',isAuthentication,getOthersProfileController);

export  {signUpRouter,loginRouter,logOutRouter,TweetRouter,DeleteRouter,likeOrDisLikeRouter,editProfileRouter,bookmarksRouter,getProfileRouter,getOthersProfileRouter};