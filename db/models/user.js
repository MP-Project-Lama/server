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
  activeCode: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61c0889f52ac4eb6e08b7c34",
  },
});

module.exports = mongoose.model("User", userSchema);
