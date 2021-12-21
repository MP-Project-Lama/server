const express = require("express");
const postsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const { createNewPost, getThePosts } = require("../controllers/post");


// Routes
postsRouter.post("/post", authentication, createNewPost);
postsRouter.get("/blog", authentication, getThePosts);

module.exports = postsRouter;