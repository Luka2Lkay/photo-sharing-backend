const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const { secretKey } = require("../config/auth_key_config");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const hash = bcrypt.hashSync(password, 10);
  const hash2 = bcrypt.hashSync(confirmPassword, 10);

  const checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g.test(email);

  try {
    const user = new User({
      username,
      email,
      password: hash,
      confirmPassword: hash2,
    });

if(password !== confirmPassword){
  return res.status(401).json({message: "no match"})
}

    if (password === confirmPassword && checkEmail) {
      const registeredUser = await user.save();
      res
        .status(201)
        .json({ message: "Registered successfully!", user: registeredUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "User not found" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      res.status(401).json({ message: "incorrect password" });
    }

    const token = jwt.sign(
      { username: user.username, userId: user._id },
      secretKey.secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token: token, expiresIn: "1h" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({message: error.message})
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await User.findById(id)

    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.removeOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await User.findByIdAndDelete(id);

    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    const { body } = req.body;

    await User.deleteMany({}, body);

    res.status(201).json("Deleted All Users");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
