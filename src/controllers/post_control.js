const postModel = require("../models/post_model");

exports.createPost = async (req, res) => {
  try {
    const { name, image, caption } = req.body;
    // const image = "http://localhost:3300/images/" + req.file.filename;

    const post = new postModel({
      name,
      caption,
      image,
    });

    const getPostUpload = await post.save();
    res.status(201).json(getPostUpload);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAllPosts = async (_req, res) => {
  try {
    const sharedPosts = await postModel.find();
    res.status(200).json(sharedPosts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const sharedPost = await postModel.findById(id);
    res.status(200).json(sharedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndRemove(id);
    res.status(200).json("Removed Successful!");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteAllPosts = async (req, res) => {
  try {
    const { body } = req;
    await postModel.deleteMany({}, body);
    res.status(201).json("Removed all!");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
