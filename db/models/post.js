const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: {
    type: Array
  },
  media: {
    type: Array,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },

  isDel: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Post", postSchema);
