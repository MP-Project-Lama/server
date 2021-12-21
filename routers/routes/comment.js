const express = require("express");
const commentsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const { createNewComment, getTheComments } = require("../controllers/comment");


// Routes
commentsRouter.post("/comment", authentication, createNewComment);
commentsRouter.get("/comments/:id", authentication, getTheComments);


module.exports = commentsRouter;