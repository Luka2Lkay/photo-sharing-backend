const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    image: { type: String, required: true },
    likes: [String],
    user: { type: String, required: true },
    comments: [{
      comment: String,
      createdAt: {type: Date, default: Date.now()},
      postedBy: String
    }]
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
