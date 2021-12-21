const express = require("express");
const usersRouter = express.Router();


const {
  signUp,
  verifyEmail,
  login,
  getMyAccount,
  getAllUsers,
  editInfo,
  
} = require("../controllers/user");



usersRouter.post("/signup", signUp);
usersRouter.post("/verify",verifyEmail);
usersRouter.post("/login", login);
usersRouter.get("/user/:id", getMyAccount);
usersRouter.get("/users", getAllUsers);
usersRouter.put("/edit", editInfo);


module.exports = usersRouter;