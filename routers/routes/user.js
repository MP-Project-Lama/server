const express = require("express");
const usersRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const passport = require("passport");

const popupTools = require("popup-tools");

require("./../../Config/passport");

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
  getTheDesignrs,
  getDesignr,
  deleteUser,
} = require("../controllers/user");



usersRouter.post("/signup", signUp);
usersRouter.post("/verify",verifyEmail);
usersRouter.post("/login", login);
usersRouter.get("/user/:id", authentication, getMyAccount);
usersRouter.put("/user/:id", authentication, editInfo);
usersRouter.get("/users",authentication,   getAllUsers);
usersRouter.post("/check", checkTheEmail);
usersRouter.post("/reset", resetPassword);
usersRouter.put("/designer", authentication, createAboutDesigner);
usersRouter.get("/designers", getTheDesignrs);
usersRouter.get("/designer/:id", getDesignr);
usersRouter.put("/remove/:id", authentication, deleteUser);



usersRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
usersRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.end(popupTools.popupResponse(req.user));
  }
);



module.exports = usersRouter;