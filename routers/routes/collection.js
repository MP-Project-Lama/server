const express = require("express");
const collectionsRouter = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const designerAuthorization = require("../middlewares/designerAuthorization")
const {
  createLook,
  editLook,
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

collectionsRouter.post(
  "/collection",
  authentication,
  designerAuthorization,
  createNewCollection
);
collectionsRouter.put(
  "/approve/:id",
  authentication,
  authorization, getTheApprove
);
collectionsRouter.put(
  "/look/:id",
  authentication,
  designerAuthorization, editLook
);
collectionsRouter.post("/look", authentication, designerAuthorization, createLook);
collectionsRouter.get("/collections", getTheCollections);
collectionsRouter.get("/collection/:id", authentication, getCollection);
collectionsRouter.post(
  "/collections",
  getCollectionsOfCategory
);
collectionsRouter.post("/material", authentication, getCollectionsOfMaterial);
collectionsRouter.put(
  "/collection/:id",
  authentication,
  designerAuthorization,
  editCollection
);
collectionsRouter.post("/fav/:id", authentication, favCollection);
collectionsRouter.put("/del/:id", authentication,designerAuthorization, removeCollection);

module.exports = collectionsRouter;
