const express = require("express");
const usersRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");


const {
  signUp,
  verifyEmail,
  login,
  getMyAccount,
  getAllUsers,
} = require("../controllers/user");



usersRouter.post("/signup", signUp);
usersRouter.post("/verify",verifyEmail);
usersRouter.post("/login", login);
usersRouter.get("/user/:id", authentication, getMyAccount);
usersRouter.get("/users", authentication, authorization, getAllUsers);

module.exports = usersRouter;