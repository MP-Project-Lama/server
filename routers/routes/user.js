const express = require("express");
const usersRouter = express.Router();


const {
    signUp
} = require("../controllers/user");



usersRouter.post("/signup", signUp);


module.exports = usersRouter;