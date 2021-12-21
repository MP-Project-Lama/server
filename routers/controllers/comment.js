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

module.exports = {
  createNewComment,
};