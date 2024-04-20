const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.signUp = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/user-profile");
  } else {
    return res.render("user_sign_up");
  }
};

module.exports.profilePreview = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {

      return res.status(404).send("User not found");
    }
    req.flash("success", `welcome ${user.name}`);
    res.render("profile_preview", { user: user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).send("Error fetching user data");
  }
};

module.exports.userProfile = async function (req, res) {
  return res.render("user_profile");
};

module.exports.signIn = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/user-profile");
  } else {
    return res.render("user_sign_in");
  }
};

module.exports.createSession = async function (req, res) {
  console.log("session created successfully");
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

module.exports.uploadPicture = async function (req, res) {
  try {
    // Find user by ID and render their profile
    const user = await User.findById(req.params.id);
    return res.render("upload_picture", {
      user: user,
    });
  } catch (err) {
    // Handle errors if any
    console.error("Error finding user's profile:", err);
    return res.status(500).json({ error: "Internal Server Error" }); // Generic error for client
  }
};

// Controller function to destroy session upon logout
module.exports.destroySession = function (req, res) {
  // Logout the user
  req.logout(function (err) {
    if (err) {
      console.log("Error in logging out:", err);
      return;
    }
    // Redirect to home page after logout
    req.flash("success", "Logged Out Successfully");
    return res.redirect("/");
  });
};

module.exports.update = async function (req, res) {
  if (req.params.id == req.user.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, async function (err) {
        if (err) {
          console.log("***** Multer Error *****", err);
          return res.status(500).json({ error: "Error processing file" });
        }

        user.location = req.body.location;

        if (req.file) {
          if (user.avatar) {
            let avatarPath = path.join(__dirname, "..", user.avatar);
            if (fs.existsSync(avatarPath)) {
              fs.unlinkSync(avatarPath);
            }
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        try {
          await user.save();
          if (req.xhr) {
            req.flash("success", "Profile updated successfully.");
            return res.status(200).json({
              data: { user },
              message: "Profile updated successfully.",
            });
          } else {
            return res.redirect("back");
          }
        } catch (saveErr) {
          console.error("Error saving user:", saveErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(401).json({
      error: "Warning! You are not authorized to update this profile",
    });
  }
};

module.exports.updateBasic = async function (req, res) {
  if (req.params.id == req.user.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, async function (err) {
        if (err) {
          console.log("***** Multer Error *****", err);
          return res.status(500).json({ error: "Error processing file" });
        }
        user.name = req.body.name;
        user.location = req.body.location;

        try {
          await user.save();
          if (req.xhr) {
            req.flash("success", "Profile updated successfully.");
            return res.status(200).json({
              data: { user },
              message: "Profile updated successfully.",
            });
          } else {
            return res.redirect("back");
          }
        } catch (saveErr) {
          console.error("Error saving user:", saveErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    req.flash("error", err);
    return res.status(401).json({
      error: "Warning! You are not authorized to update this profile",
    });
  }
};
