const express = require("express");
const postsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const { createNewPost, getThePosts, getPost } = require("../controllers/post");


// Routes
postsRouter.post("/post", authentication, createNewPost);
postsRouter.get("/blog", getThePosts);
postsRouter.get("/post/:id", authentication, getPost);


module.exports = postsRouter;