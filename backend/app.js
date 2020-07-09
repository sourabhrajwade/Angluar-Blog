const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const postRoutes = require("./routes/posts");
const userRoutes = require('./routes/user');

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_UN}:${process.env.DB_PW}@cluster0-hh5l0.mongodb.net/blogger?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    //console.log(err);
    console.log("Connection failed!");
  });


  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/posts", postRoutes);
app.use("/user", userRoutes);

module.exports = app;
