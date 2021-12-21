const express = require("express");
const collectionsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const {
  createNewCollection,
  getTheCollections,
  getCollection,
} = require("../controllers/collection");

collectionsRouter.post("/collection", authentication, createNewCollection);
collectionsRouter.get("/collections", getTheCollections);
collectionsRouter.get("/collection/:id", getCollection);

module.exports = collectionsRouter;
