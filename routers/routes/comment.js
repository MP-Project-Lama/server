const express = require("express");
const commentsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const { createNewComment } = require("../controllers/comment");


// Routes
commentsRouter.post("/comment", authentication, createNewComment);


module.exports = commentsRouter;