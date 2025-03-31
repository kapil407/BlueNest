import { validationSignUp } from "../utils/signUpValidation.js";
import express from "express";
import { signUpController } from "../Controller/SignUpController.js";
import {LoginController} from '../Controller/LoginController.js'


const signUpRouter=express.Router();

 signUpRouter.post('/signUp', validationSignUp,signUpController); // signup API

export default signUpRouter;