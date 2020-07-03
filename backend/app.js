const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/post');

mongoose.connect(`mongodb+srv://${process.env.DB_UN}:${process.env.DB_PW}@cluster0-hh5l0.mongodb.net/blogger?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to database!');
})
.catch((err) => {
  console.log(err);
  console.log('Connection failed!');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  })
});

app.get("/posts", (req, res, next) => {
  Post.find()
  .then(doc => {
    console.log(doc);
    res.status(200).json({
      message: "Post fetched",
      posts: doc,
    });
  });

});

app.delete('posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted"});
  })

})

module.exports = app;
