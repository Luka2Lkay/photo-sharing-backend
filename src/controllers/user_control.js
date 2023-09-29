const userModel = require("../models/user_model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const registeredUser = await user.save();

    res
      .status(201)
      .json({ message: "Registered successfully!", user: registeredUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    const { body } = req.body;

    await userModel.deleteMany({}, body);

    res.status(201).json("Deleted All Users");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
