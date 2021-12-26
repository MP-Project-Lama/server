const collectionModel = require("./../../db/models/collection");
const likeModel = require("./../../db/models/like");
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

//// apprve the coll
const getTheApprove = (req, res) => {
  const { id } = req.params;
  const { isPendding } = req.body;

  if (isPendding) {
    collectionModel
      .findOne({ _id: id })
      .then((result) => {
        if (result) {
          collectionModel
            .findByIdAndUpdate(
              { _id: id, isPendding: false },
              {
                isPendding: true,
              },
              { new: true }
            )
            .then((result) => {
              res.status(200).json(result);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    collectionModel
      .findByIdAndUpdate(
        { _id: id },
        {
          isPendding: false,
        },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

// to get all collections in the app :
const getTheCollections = (req, res) => {
  collectionModel
    .find({ isDel: false, isPendding: true })
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
/// get collections of specific category
const getCollectionsOfCategory = (req, res) => {
  const { category } = req.body;
  collectionModel
    .find({ isDel: false, isPendding: true, category  })
    .populate("createdBy")
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.state(404).json({ message: " There Is No Collection" });
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

/// get collections of specific material
const getCollectionsOfMaterial = (req, res) => {
  const { material } = req.body;
  collectionModel
    .find({ isDel: false, isPendding: true, material })
    .populate("createdBy")
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.state(404).json({ message: " There Is No Collection" });
      }
    })
    .catch((error) => {
      res.status(400).json(error);
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
        isPendding: false,
      },
      { new: true }
    )
    .then((result) => {
      // console.log(result.material);
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

// this function to fav specific collection in the app
const favCollection = (req, res) => {
  const { id } = req.params;
  const { like } = req.body;

  if (like) {
    likeModel
      .findOne({ designs: id, user: req.token.id })
      .then((result) => {
        if (result) {
          likeModel
            .findOneAndUpdate(
              { designs: id, user: req.token.id, isLike: false },
              { isLike: true },
              { new: true }
            )
            .then((result) => {
              if (result) {
                res.status(200).json({ message: "added like successfully" });
              } else {
                res.status(404).json({ message: " There Is No Collection !" });
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          const newLike = new likeModel({
            designs: id,
            user: req.token.id,
          });

          newLike
            .save()
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    likeModel
      .findOneAndUpdate(
        { designs: id, user: req.token.id, isLike: true },
        { isLike: false },
        { new: true }
      )
      .then((result) => {
        if (result) {
          res.status(200).json({ message: " Unliked Post Successfully" });
        } else {
          res.status(404).json({ message: "There Is No Post !" });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

/// this function to remove a collection in the app (soft delete):
const removeCollection = (req, res) => {
  const { id } = req.params;

  collectionModel
    .findOneAndUpdate(
      {
        _id: id,
        isDel: false,
        createdBy: req.token.id,
      },
      {
        isDel: true,
      },
      { new: true }
    )
    .then((result) => {
      if (result) {
        likeModel
          .updateMany({ designs: id, isLike: true }, { isLike: false })
          .then(() => {
            res
              .status(200)
              .json({ message: " All collection Likes Deleted !" });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
        res
          .status(200)
          .json({ message: "Collection has been Deleted successfully " });
      } else {
        console.log(res);
        res
          .status(404)
          .json({ message: " There Is No Collection To Delete ! " });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = {
  createNewCollection,
  getTheApprove,
  getTheCollections,
  getCollection,
  getCollectionsOfCategory,
  getCollectionsOfMaterial,
  editCollection,
  favCollection,
  removeCollection,
};
