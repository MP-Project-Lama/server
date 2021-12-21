const collectionModel = require("./../../db/models/collection");

// this function to create a new collection
const createNewCollection = (req, res) => {
  const { title, desc, media, material, category } = req.body;

  const collection = new collectionModel({
    title,
    desc,
    media,
    material,
    category,
    createdBy: req.token.id,
  });

  collection
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


// to get all collections in the app : 
const getTheCollections = (req, res) => {
  collectionModel
    .find({ isDel: false })
    .populate("createdBy")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "There Is No Collections!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


module.exports = {
  createNewCollection,
  getTheCollections,
};
