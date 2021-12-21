const express = require("express");
const collectionsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const {
  createNewCollection,
  getTheCollections,
  getCollection,
  editCollection,
  favCollection,
  removeCollection,
} = require("../controllers/collection");

collectionsRouter.post("/collection", authentication, createNewCollection);
collectionsRouter.get("/collections", getTheCollections);
collectionsRouter.get("/collection/:id", authentication, getCollection);
collectionsRouter.put("/collection/:id", authentication, editCollection);
collectionsRouter.post("/fav/:id", authentication, favCollection);
collectionsRouter.put("/del/:id", authentication, removeCollection);



module.exports = collectionsRouter;
