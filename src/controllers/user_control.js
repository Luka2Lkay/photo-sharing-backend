const userModel = require("../models/user_model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const hash2 = bcrypt.hashSync(req.body.password, 10);

  const checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g.test(req.body.email);
  try {
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      confirmPassword: hash2,
    });

    if (req.body.password === req.body.confirmPassword && checkEmail) {
      const registeredUser = await user.save();
      res
        .status(201)
        .json({ message: "Registered successfully!", user: registeredUser });
    }
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
