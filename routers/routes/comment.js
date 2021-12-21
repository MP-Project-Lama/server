const express = require("express");
const commentsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const {
  createNewComment,
  getTheComments,
  removeComment,
} = require("../controllers/comment");


// Routes
commentsRouter.post("/comment", authentication, createNewComment);
commentsRouter.get("/comments/:id", authentication, getTheComments);
commentsRouter.put("/comment/:id", authentication, removeComment);


module.exports = commentsRouter;