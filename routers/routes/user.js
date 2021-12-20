const express = require("express");
const usersRouter = express.Router();


const {
  signUp,
  verifyEmail,
  login,
  getAllUsers,
} = require("../controllers/user");



usersRouter.post("/signup", signUp);
usersRouter.post("/verify",verifyEmail);
usersRouter.post("/login", login);
usersRouter.get("/users", getAllUsers);

module.exports = usersRouter;