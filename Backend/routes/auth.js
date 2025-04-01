import { validationSignUp } from "../utils/signUpValidation.js";
import express from "express";


import loginValidation from '../utils/loginValidation.js'
import isAuthentication from '../Middleware/Authentication.js'

import  {signUpController,LoginController,LogOutController} from "../Controller/UserController.js";
import { createTweetController } from "../Controller/TweetController.js";

const signUpRouter=express.Router();
const loginRouter=express.Router();
const logOutRouter=express.Router();
const TweetRouter=express.Router();

 signUpRouter.post('/signUp', validationSignUp,signUpController); // signup API
loginRouter.post('/login',loginValidation,LoginController); // login api
logOutRouter.post('/logout',LogOutController);
TweetRouter.post('/createTweet',isAuthentication ,createTweetController);

export  {signUpRouter,loginRouter,logOutRouter,TweetRouter};