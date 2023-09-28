const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    caption: { type: String, required: true },
    image: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("postModel", postSchema);
