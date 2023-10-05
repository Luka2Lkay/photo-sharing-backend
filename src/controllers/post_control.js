const { default: mongoose } = require("mongoose");
const Post = require("../models/post_model");
const User = require("../models/user_model");

exports.createPost = async (req, res) => {
  try {
    const { name, image, caption, users } = req.body;
    // const image = "http://localhost:3300/images/" + req.file.filename;

    let existingUser;

    try {
      existingUser = await User.findById(users);
    } catch {
      return res.status(401).json({ message: "User does not exist" });
    }

    const post = new Post({
      name,
      caption,
      image,
      users,
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

exports.deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndRemove(id);
    res.status(200).json("Removed Successful!");
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
