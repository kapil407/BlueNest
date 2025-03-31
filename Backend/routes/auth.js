import { validationSignUp } from "../utils/signUpValidation.js";
import express from "express";
import { signUpController } from "../Controller/SignUpController.js";
import LoginController from '../Controller/LoginController.js'
import loginValidation from '../utils/loginValidation.js'

const signUpRouter=express.Router();
const loginRouter=express.Router();

 signUpRouter.post('/signUp', validationSignUp,signUpController); // signup API
loginRouter.post('/login',loginValidation,LoginController); // login api


export  {signUpRouter,loginRouter}