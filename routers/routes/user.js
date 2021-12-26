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
  editInfo,
  checkTheEmail,
  resetPassword,
  createAboutDesigner,
  getTheDesignrs
} = require("../controllers/user");



usersRouter.post("/signup", signUp);
usersRouter.post("/verify",verifyEmail);
usersRouter.post("/login", login);
usersRouter.get("/user/:id", authentication, getMyAccount);
usersRouter.get("/users",authentication, getAllUsers,  getAllUsers);
usersRouter.post("/check", checkTheEmail);
usersRouter.post("/reset", resetPassword);
usersRouter.put("/designer", authentication, createAboutDesigner);
usersRouter.get("/designers", getTheDesignrs);




module.exports = usersRouter;