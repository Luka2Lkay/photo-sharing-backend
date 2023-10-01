const userModel = require("../models/user_model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

   const hash = bcrypt.hashSync(password, 10);
   const hash2= bcrypt.hashSync(confirmPassword, 10);

  const checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g.test(email);

  try {
    const user = new userModel({
      username,
      email,
      password: hash,
      confirmPassword: hash2,
    });

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

    const user = await userModel.findOne({username});

    if (!user) {
      res.status(401).json({message: 'User not found'})
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password)

 if (!checkPasswordMatch) {
  res.status(401).json({message: "incorrect password"})
 }

 res.status(200).json({message: "Successfully logged in"})
  } catch {}
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
