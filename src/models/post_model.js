const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    image: { type: String, required: true },
    likes: [String],
    comments: [{
      comment: {type: String},
      createdAt: {type: Date, default: Date.now()},
      postedBy: {type: mongoose.Types.ObjectId, ref: "User"}
    }]
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
