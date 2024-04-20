const express = require("express");

const router = express.Router();

const User = require("../models/user");

const passport = require("../config/passport-local-strategy");

const userController = require("../controllers/users_controller");

const createUser = require("../config/createMiddleware");

let varAction;
console.log("users router loaded");

router.post(
  "/create",
  createUser.create, // Middleware to create the user
  passport.authenticate("local", { failureRedirec: "/users/sign-in" }),
  userController.profilePreview
);

router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.get(
  "/user-profile",
  passport.checkAuthentication,
  userController.userProfile
);
router.get(
  "/upload-picture/:id",
  passport.checkAuthentication,
  userController.uploadPicture
);
router.post("/update/:id", passport.checkAuthentication, userController.update);
router.post("/update-basic/:id", passport.checkAuthentication, userController.updateBasic);
router.get(
  "/sign-out",
  passport.checkAuthentication,
  userController.destroySession
);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirec: "/users/sign-up" }),
  userController.createSession
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  function (req, res) {
      if (req.user) {
          if (req.authInfo && req.authInfo.isNewUser) {  // Ensure req.authInfo exists
              userController.profilePreview(req, res);  // Execute function
          } else {
              userController.createSession(req, res);  // Execute function
          }
      } else {
          res.redirect("/users/sign-in");
      }
  }
);


module.exports = router;
