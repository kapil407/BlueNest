import express from "express";
import { SignUpValidation } from "../utils/signUpValidation.js";
import loginValidation from "../utils/loginValidation.js";
import isAuth from "../Middleware/Authentication.js";

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

const router = express.Router();

// Auth routes
router.post("/signup", SignUpValidation, signUpController);
router.post("/login", loginValidation, LoginController);
router.post("/logout", LogOutController);

// Profile routes
router.patch("/updateProfile", isAuth, editProfileController);
router.get("/getProfile/:id", isAuth, getProfileController);
router.get("/getOthersProfile", isAuth, getOthersProfileController);

// Bookmark route
router.patch("/bookmarkstweet/:id", isAuth, bookmarksController);

// Follow/Unfollow routes
router.post("/follow/:id", isAuth, FollowingController);
router.post("/unfollow/:id", isAuth, unFollowController);

export default router;
