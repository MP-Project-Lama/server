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


module.exports = {
  createNewPost
};