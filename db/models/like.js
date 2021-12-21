const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  isLike: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  designs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
  },
});

module.exports = mongoose.model("Like", likeSchema);
