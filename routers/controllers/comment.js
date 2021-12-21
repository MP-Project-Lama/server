const commentModel = require("./../../db/models/comment");



// this function to create a new comment in the app
const createNewComment = (req, res) => {
  const { comment, postID } = req.body;

  const newComment = new commentModel({
    comment,
    createdBy: req.token.id,
    post: postID,
  });

  newComment
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


/// to get a all post's comment 
const getTheComments = (req, res) => {
  const { id } = req.params;
  commentModel
    .find({ post: id, isDel: false })
    .populate("createdBy")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
       
      } else {
        res.status(404).json({ message: "There Is No Post With this ID!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



module.exports = {
  createNewComment,
  getTheComments,
};