const mongoose = require("mongoose");

const multer = require("multer");
const { type } = require("os");
const path = require("path");
const { stringify } = require("querystring");
const AVATAR_PATH = path.join("/uploads/users/avatars");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique:true
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    agreement: {
      type: String,
    },
    avatar:{
      type:String
    },
    location:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// static

userSchema.statics.uploadedAvatar = multer({
  storage: storage,
}).single("avatar");

userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("user", userSchema);

module.exports = User;
