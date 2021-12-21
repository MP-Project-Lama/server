const commentModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post");



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


/// this function to remove comment in the app
const removeComment = (req, res) => {
  const { id } = req.params;
  const { postID } = req.body;
  postModel
    .findOne({ _id: postID, isDel: false })
    .then((post) => {
      if (post) {
        commentModel.findOne({ _id: id, post: postID }).then((comment) => {
          if (comment) {
            if (
              comment.createdBy == req.token.id ||
              post.createdBy == req.token.id
            ) {
              commentModel
                .findByIdAndUpdate(
                  { _id: id, isDel: false, post: postID },
                  {
                    isDel: true,
                  },
                  { new: true }
                )
                .then(() => {
                  res
                    .status(200)
                    .json({ message: "commnet has been deleted !" });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(400).json(err);
                });
            } else {
              res.status(403).json({ message: " Forbbiden !" });
            }
          } else {
            res.status(404).json({ message: " There Is No Comment !" });
          }
        });
      } else {
        res.status(404).json({ message: " There Is No Post !" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


module.exports = {
  createNewComment,
  getTheComments,
  removeComment
};