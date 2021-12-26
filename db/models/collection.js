const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: {
    type: String,
    required: true,
  },
  media: {
    type: Array,
    required: true,
  },
  material: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  isDel: {
    type: Boolean,
    default: false,
  },
  like: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
  isPendding : { type : Boolean , default: false}
});


module.exports = mongoose.model("Collection", collectionSchema);
