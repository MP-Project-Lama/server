const express = require("express");
const rolesRouter = express.Router();

const { createRole } = require("../controllers/role");

rolesRouter.post("/role", createRole);


module.exports = rolesRouter;
