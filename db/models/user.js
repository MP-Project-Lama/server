const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  isDel: { type: Boolean, default: false },

  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  resetCode: {
    type: String,
  },
  isDesigner: {
    type: Boolean,
    default: false,
  },
  activeCode: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  about: {
    type: String,
  },
  photos: {
    type: Array,
  },
  concat: {
    type: Array,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61c1d3f7d78e4617e8b57386",
  },
});


module.exports = mongoose.model("User", userSchema);
