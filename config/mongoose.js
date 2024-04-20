const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./hi.env" });

mongoose
  .connect(
    `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.1dprcrn.mongodb.net/${process.env.databaseName}?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    }
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
