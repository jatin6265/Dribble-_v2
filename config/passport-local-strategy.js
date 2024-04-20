const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// **WARNING: Storing passwords in plain text is extremely insecure!**

// Authentication using Passport
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback:true
    },
    async function (req,email, password, done) {
      try {
        // Find the user and establish identity (assuming plain text password)
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          req.flash('error','Invalid Username/Password')
          console.log("Invalid Username/Email or password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        req.flash('error',err)
        console.error("Error in finding user:", err);
        return done(err);
      }
    }
  )
);

// Serializing the user (storing user ID in the session)
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user (retrieving user from ID)
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch {
    console.error("Error in finding user:", err);
    return done(err);
  }
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // user is not sign-in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticateduser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.res conatains the current signed in user from the session cookie and we  just  sendig this to the local for the views
    res.locals.user = req.user;
  }
  return next();
};

// Your existing Passport configuration...

// Export checkAuthentication and setAuthenticatedUser as properties of the passport object

module.exports = passport;
