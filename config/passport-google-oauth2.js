const dotenv = require("dotenv").config({ path: "./hi.env" });
const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, //this is const which we are importing from hi.env file
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, //allthough we can also use it directly as the value
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    async function (accessToken, refresh, profile, done) {
      try {
        // Find the user
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // If found, set this user as req.user
          return done(null, user);
        } else {
          // If not found, create the user
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto. randomBytes (20). toString ('hex')
          });
          return done(null, user,{ isNewUser: true });
        }
      } catch (error) {
        console.log("Error in Google strategy passport:", error);
        return done(error);
      }
    }
  )
);


module.exports=passport;