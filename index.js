const express = require("express");
const cookieParser=require('cookie-parser');
const mongoose = require("mongoose");
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./config/mongoose");
const MongoStore = require("connect-mongo");
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2');
const dotenv=require('dotenv').config({ path: './hi.env' });
const flash = require("connect-flash");
const customMiddleware = require("./config/flashMiddleware");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use( 
  session({
    name: "codeial",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // 100 minutes
      secure: false,
      httpOnly: true,
    },
    store: MongoStore.create({
      mongoUrl: `mongodb://chouhanjatin6265:${process.env.password}@ac-0pjbder-shard-00-00.1dprcrn.mongodb.net:27017,`
        + `ac-0pjbder-shard-00-01.1dprcrn.mongodb.net:27017,`
        + `ac-0pjbder-shard-00-02.1dprcrn.mongodb.net:27017/?ssl=true&`
        + `replicaSet=atlas-jvkgjj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`,
      autoRemove: "disabled"
    },
    // store: MongoStore.create(
    //   { mongoUrl: "mongodb://localhost:27017/Dribble", autoRemove: "disabled" },
      function (err) {
        console.log(err || "connect mongo-db setup ok");
      }
    ),
    autoRemove: "disabled", 
  })
); 
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user middleware
app.use(passport.setAuthenticateduser);

app.use(flash());
app.use(customMiddleware.setFlash);

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static assets
app.use(express.static(path.join(__dirname, "assets")));
// makes the upload path available
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);
app.set("layout", "./layouts/layout.ejs");

 // Routes setup
app.use("/", require("./routes"));

// Start server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server : ${err}`);
  }
  console.log(`Server is running on port: : ${port}`);
});
