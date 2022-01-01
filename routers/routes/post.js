const express = require("express");
const postsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const designerAuthorization = require("../middlewares/designerAuthorization");

const {
  createNewPost,
  getThePosts,
  getPost,
  editPost,
  removePost,
} = require("../controllers/post");


// Routes
postsRouter.post("/post", authentication, designerAuthorization, createNewPost);
postsRouter.get("/blog", getThePosts);
postsRouter.get("/post/:id", authentication, getPost);
postsRouter.put("/post/:id", authentication, editPost);
postsRouter.put("/delete/:id", authentication, removePost);


module.exports = postsRouter;