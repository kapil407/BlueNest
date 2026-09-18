import express from 'express'
import bcrypt from 'bcrypt'
import passport from '../Controller/Passport.js'
import isAuth from '../Middleware/Authentication.js'
import { AccessToken, RefreshToken } from '../GenerateTokens/Tokens.js'

const router=express.Router();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

const cookieOptions = {
  sameSite: "None",
  secure: true,
  httpOnly: true,
};

router.use(passport.initialize());

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  async (req, res) => {
    passport.authenticate("google", { session: false }, async (err, user) => {
      if (err || !user) {
        console.log("Google OAuth failed:", {
          message: err?.message,
          code: err?.code,
          statusCode: err?.statusCode,
          data: err?.data,
        });
        return res.redirect(`${frontendUrl}/login?google=failed`);
      }

      try {
         console.log("✅ GOOGLE CALLBACK HIT");
     
        const accessToken = AccessToken(user._id);
        const refreshToken = RefreshToken(user._id);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        user.RefreshToken.push({
          token: hashedRefreshToken,
          Device: req.headers["user-agent"] || "Unknown Device",
        });
        await user.save();

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);
        console.log("refresh and access token in google Routes ",refreshToken," sss->>",accessToken)

        return res.redirect(`${frontendUrl}/auth/google/success`);
      } catch (error) {
        console.log("Google auth callback error:", error);
        return res.redirect(`${frontendUrl}/login?google=failed`);
      }
    })(req, res);
  }
);

router.get("/auth/me", isAuth, (req, res) => {

  try {
     console.log("USER : in /auth/me ", req.user);
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
      console.log("error in 'auth/me ",error);
      return res.json("error in /auth/me ",error);
  }
});

export default router;
