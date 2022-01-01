const mongoose = require("mongoose");

const lookSchema = new mongoose.Schema({
  look: {
    type: Array,
  },
});

module.exports = mongoose.model("Look", lookSchema);
