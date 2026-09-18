import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from 'dotenv'
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (GoogleAccessToken, GoogleRefreshToken, profile, cb) => {
      try {
        console.log(profile);

        const emailId = profile.emails?.[0]?.value;

        const firstName = profile.name?.givenName || "";
        const lastName = profile.name?.familyName || "";

        // Existing user check
        let user = await User.findOne({ emailId });

        if (user) {
          return cb(null, user);
        }

        // New Google user
        user = new User({
          firstName,
          lastName,
          emailId,

          // Google profile ka unique username/id
          userName: profile.id,

          password: null,

          otpVerified: true,
          verificationCode: null,
          expiryOtp: null,

          authProvider: "google",
        });

        await user.save();

        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
export default passport; 