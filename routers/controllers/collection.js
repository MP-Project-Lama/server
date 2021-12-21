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

// this function to get a collection
const getCollection = (req, res) => {
  const { id } = req.params;
  collectionModel
    .find({ _id: id, isDel: false })
    .populate("createdBy")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "There Is No Collection With this ID!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

/// this function to edit specific collection in the app
const editCollection = (req, res) => {
  const { id } = req.params;
  const { title, desc, media, material, category } = req.body;
  //// update
  collectionModel
    .findOneAndUpdate(
      {
        _id: id,
        isDel: false,
        createdBy: req.token.id,
      },
      {
        title,
        desc,
        media,
        material,
        category,
      },
      { new: true }
    )
    .then((result) => {
      console.log(result.material);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: " There Is No Collection ! " });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


/// this function to fav specific collection in the app


module.exports = {
  createNewCollection,
  getTheCollections,
  getCollection,
  editCollection,
};
