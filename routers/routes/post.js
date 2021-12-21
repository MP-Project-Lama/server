const express = require("express");
const postsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const { createNewPost } = require("../controllers/post");


// Routes
postsRouter.post("/post", authentication, createNewPost);


module.exports = postsRouter;