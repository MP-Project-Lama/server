const express = require("express");
const usersRouter = express.Router();


const { signUp, verifyEmail, login } = require("../controllers/user");



usersRouter.post("/signup", signUp);
usersRouter.post("/verify",verifyEmail);
usersRouter.post("/login", login);

module.exports = usersRouter;