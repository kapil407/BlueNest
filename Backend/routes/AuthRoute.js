import { SignUpValidation } from "../utils/signUpValidation.js";
import express from "express";
import loginValidation from "../utils/loginValidation.js";
import isAuthentication from "../Middleware/Authentication.js";

import {
  signUpController,
  LoginController,
  LogOutController,
  editProfileController,
  bookmarksController,
  getProfileController,
  getOthersProfileController,
  FollowingController,
  unFollowController,
} from "../Controller/UserController.js";

const signUpRouter = express.Router();
const loginRouter = express.Router();
const logOutRouter = express.Router();

const editProfileRouter = express.Router();
const bookmarksRouter = express.Router();
const getProfileRouter = express.Router();
const getOthersProfileRouter = express.Router();
const FollowingRouter = express.Router();
const unFollowRouter = express.Router();

signUpRouter.post("/signUp", SignUpValidation, signUpController); // signup API
loginRouter.post("/login", loginValidation, LoginController); // login api
logOutRouter.post("/logout", LogOutController);

editProfileRouter.patch(
  "/updateProfile",
  isAuthentication,
  editProfileController
);
bookmarksRouter.patch(
  "/bookmarkstweet/:id",
  isAuthentication,
  bookmarksController
);
getProfileRouter.get("/getProfile/:id", isAuthentication, getProfileController);
getOthersProfileRouter.get(
  "/getOthersProfile",
  isAuthentication,
  getOthersProfileController
);
FollowingRouter.post("/follow/:id", isAuthentication, FollowingController);
unFollowRouter.post("/unfollow/:id", isAuthentication, unFollowController);

export {
  signUpRouter,
  loginRouter,
  logOutRouter,
  editProfileRouter,
  bookmarksRouter,
  getProfileRouter,
  getOthersProfileRouter,
  FollowingRouter,
  unFollowRouter,
};
