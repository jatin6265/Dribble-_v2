const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./hi.env" });

mongoose
  .connect(
    `mongodb://chouhanjatin6265:${process.env.password}@ac-0pjbder-shard-00-00.1dprcrn.mongodb.net:27017,ac-0pjbder-shard-00-01.1dprcrn.mongodb.net:27017,ac-0pjbder-shard-00-02.1dprcrn.mongodb.net:27017/?ssl=true&replicaSet=atlas-jvkgjj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to db"));

db.once("open", function () {
  console.log("connected successfully to the database");
});

module.exports = db;
