const express = require("express");
const collectionsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const {
  createNewCollection,
  getTheApprove,
  getTheCollections,
  getCollection,
getCollectionsOfCategory,
getCollectionsOfMaterial,
  editCollection,
  favCollection,
  removeCollection,
} = require("../controllers/collection");

collectionsRouter.post("/collection", authentication, createNewCollection);
collectionsRouter.put(
  "/approve/:id",
  authentication,
  authorization, getTheApprove
);
collectionsRouter.get("/collections", getTheCollections);
collectionsRouter.get("/collection/:id", authentication, getCollection);
collectionsRouter.post("/collections",  getCollectionsOfCategory);
collectionsRouter.post("/material", authentication, getCollectionsOfMaterial);
collectionsRouter.put("/collection/:id", authentication, editCollection);
collectionsRouter.post("/fav/:id", authentication, favCollection);
collectionsRouter.put("/del/:id", authentication, removeCollection);

module.exports = collectionsRouter;
