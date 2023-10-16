const { default: mongoose } = require("mongoose");
const Post = require("../models/post_model");
const User = require("../models/user_model");

exports.createPost = async (req, res) => {
  try {
    const { caption, user } = req.body;
    const image = "http://localhost:3300/images/" + req.file.filename;

    let existingUser;

    try {
      existingUser = await User.findById(req.userId);
    } catch {
      return res.status(401).json({ message: "User does not exist" });
    }

    const post = new Post({
      caption,
      image,
      user,
    });

    const getPostUpload = await post.save();
    existingUser.posts.push(post);
    existingUser.save();
    res.status(201).json(getPostUpload);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAllPosts = async (_req, res) => {
  try {
    const sharedPosts = await Post.find();

    res.status(200).json(sharedPosts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const sharedPost = await Post.findById(id);
    res.status(200).json(sharedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getPostByUserId = async (req, res) => {
  const { id } = req.params;
  let userPosts;

  try {
    userPosts = await User.findById(id).populate("posts");
    return res.status(200).json({ posts: userPosts.posts });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }

  if (!userPosts) {
    return res.status(404).json({ message: "No posts found" });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndRemove(id);
    const existingUser = await User.findById(req.userId);
    await existingUser.posts.pull(post);
    await existingUser.save();

    res.status(200).json("Removed successfully!");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteAllPosts = async (req, res) => {
  try {
    const { body } = req;
    await Post.deleteMany({}, body);
    res.status(201).json("Removed all!");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const { id } = req.params;

    const singlePost = await Post.findById(id);

    if (!singlePost.likes.includes(req.userId)) {
      const post = await Post.findByIdAndUpdate(
        id,
        { $push: { likes: req.userId } },
        { new: true }
      );
      res.status(200).json(post);
    } else {
      const post = await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: req.userId } },
        { new: true }
      );
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.comment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const post = await Post.findById(id);
    const existingUser = await User.findById(req.userId)
    post.postedBy = existingUser.username;

    await Post.findByIdAndUpdate(
      id,
      { $push: { comments: { postedBy: post.postedBy, comment: comment } } },
      { new: true }
    );

    res.status(200).json("Comment added!");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// exports.removeComment = async (req, res) => {
//   try {
//     const { comment } = req.body;

//     const addComment = await Post.findByIdAndUpdate(
//       req.body.postId,
//       { $pull: { comments: { _id: comment._id } } },
//       { new: true }
//     )
//       .populate("comments.postedBy", "_id")
//       .populate("postedBy", "_id");

//     res.status(200).json(addComment);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };
