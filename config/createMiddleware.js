const User = require("../models/user");

// Assuming userController.create is defined properly to handle being a middleware:
module.exports.create = async function(req, res, next) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        req.flash("error", "Email already registered");
        return res.redirect("back");
      }
  
      // Check username
      const existingUsername = await User.findOne({ username: req.body.username });
      if (existingUsername) {
        req.flash("error", "Username already exists");
        return res.redirect("back");
      }
  
      // Create user
      const newUser = await User.create(req.body);
      req.flash("Account created successfully");
      console.log("User created successfully");
      req.user = newUser; // Make user available in req for passport
      next(); // Proceed to authenticate the user
    } catch (err) {
      console.error("Error in creating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };