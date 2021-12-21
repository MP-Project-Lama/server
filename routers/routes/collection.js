const express = require("express");
const collectionsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const { createNewCollection } = require("../controllers/collection");

collectionsRouter.post("/collection", authentication, createNewCollection);

module.exports = collectionsRouter;
