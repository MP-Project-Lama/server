const postModel = require("./../../db/models/post");


/// this function to create a new post by designer in the app :
const createNewPost = (req, res) => {
  const { title, desc, media } = req.body;

  const newPost = new postModel({
    title,
    desc,
    media,
    createdBy: req.token.id,
  });

  newPost
    .save()
    .then((result) => {
      res.status(201).json(result);
      //  console.log(req);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//// this function to get all the posts in the app 
const getThePosts = (req, res) => {
  postModel
    .find({ isDel: false })
    .populate("createdBy")
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "There Is No Posts!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

/// this function to get a post in the blog
const getPost = (req, res) => {
  const { id } = req.params;
  postModel
    .find({ _id: id, isDel: false })
    .populate("createdBy")
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "There Is No Post With this ID!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = {
  createNewPost,
  getThePosts,
  getPost,
};