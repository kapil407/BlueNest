import express from "express";
import { SignUpValidation } from "../Middleware/signUpValidation.js";

import isAuth from "../Middleware/Authentication.js";
import upload from "../Middleware/multer.js";

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
  getBookmarksTweetsController,
  changeBackgroundImage,
} from "../Controller/UserController.js";

const router = express.Router();
import express from "express";
import transport from "../Middleware/Email.js";

// const router = express.Router();

router.get("/test-mail", async (req, res) => {
  try {
    const info = await transport.sendMail({
      from: "kapilkeer1998@gmail.com",
      to: "kapilkeer1998@gmail.com",
      subject: "Brevo Test",
      text: "Hello from Brevo",
    });

    console.log(info);

    res.json({
      success: true,
      info,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// export default router;
// Auth routes
router.post("/signup", SignUpValidation, signUpController);
router.post("/login", LoginController);
router.post("/logout", LogOutController);

router.patch(
  "/changeBackCover",
  upload.single("image"),
  isAuth,
  changeBackgroundImage,
);
router.patch(
  "/updateProfile",
  upload.single("image"),
  isAuth,
  editProfileController,
);
router.get("/getProfile/:id", isAuth, getProfileController);
router.get("/getOthersProfile", isAuth, getOthersProfileController);

// Bookmark route
router.patch("/bookmarkstweet/:id", isAuth, bookmarksController);
router.post("/getbookmarkedtweets", isAuth, getBookmarksTweetsController);

// Follow/Unfollow routes
router.post("/follow/:id", isAuth, FollowingController);
router.post("/unfollow/:id", isAuth, unFollowController);

export default router;
