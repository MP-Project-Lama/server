const postModel = require("./../../db/models/post");
const commentModel = require("./../../db/models/comment");

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
      if (result) {
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

/// this function to edit a post in the blog
const editPost = (req, res) => {
  const { id } = req.params;
  const { title, desc, media } = req.body;
  //// update
  postModel
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
      },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: " There Is No Post ! " });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//this function to remove a post in the blog
const removePost = (req, res) => {
  const { id } = req.params;

  postModel
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
        commentModel
          .updateMany({ post: id, isDel: false }, { isDel: true })
          .then(() => {
            res.status(200).json({ message: " All Post's Comments Deleted !" });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
        res
          .status(200)
          .json({ message: "Post has been Deleted successfully " });
      } else {
        console.log(res);
        res.status(404).json({ message: " There Is No Post To Delete ! " });
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
  editPost,
  removePost,
};
