const express = require("express");
const usersRouter = express.Router();


const { signUp, verifyEmail } = require("../controllers/user");



usersRouter.post("/signup", signUp);
usersRouter.post("/verify",verifyEmail);

module.exports = usersRouter;