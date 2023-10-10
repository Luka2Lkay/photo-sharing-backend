const { default: mongoose } = require("mongoose");
const Post = require("../models/post_model");
const User = require("../models/user_model");

exports.createPost = async (req, res) => {
  try {
    const { name, caption, users } = req.body;
    const image = "http://localhost:3300/images/" + req.file.filename;

    let existingUser;

    try {
      existingUser = await User.findById(users);
    } catch {
      return res.status(401).json({ message: "User does not exist" });
    }

    const post = new Post({
      //   name,
      caption,
      image,
      users,
    });

    const getPostUpload = await post.save();
    // existingUser.posts.push(post);
    // existingUser.save();
    console.log(existingUser);
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
    const post = await Post.findByIdAndRemove(id).populate("users");
    await post.users.posts.pull(post);
    await post.users.save();
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

exports.like = async (req, res) => {
  try {
    const { id } = req.params;

    // const post = Post.findById(id)
    //   .then(data => {
    //     if(!data.likes.includes(req.userId)){
    //       data.updateOne({ $push: { likes: req.userId}})

    //     }else{
    //       data.updateOne({ $pull: { likes: req.userId}})
    //     }

    //   })

    // const post = await Post.findById(id)

    // if(post.likes.includes(req.userId)){
    //   post.updateOne({},{ $pull: { likes: req.userId}})
    // }else {
    //   post.updateOne({ $push: { likes: req.userId}})
    // }

    const post = await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.unLike = async (req, res) => {
  try {
    const { comment } = req.body;
    comment.postedBy = req.body.userId;

    const removeLike = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );

    res.status(200).json(addLike);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// exports.comment = async (req, res) => {
//   try {
//     const { comment } = req.body;
//     comment.postedBy = req.body.userId;

//     const addComment = await Post.findByIdAndUpdate(
//       req.body.postId,
//       { $push: { comments: comment } },
//       { new: true }
//     )
//       .populate("comments.postedBy", "_id")
//       .populate("postedBy", "_id");

//     res.status(200).json(addComment);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };

// exports.uncomment = async (req, res) => {
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
