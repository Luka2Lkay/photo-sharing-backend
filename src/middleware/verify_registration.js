const { userModel } = require("../models/user_model");

const checkDuplicatedEmail = async (req, res, next) => {
  try {
    const emailUser = await User.findOne({ email: req.body.email }).exec();
    if (emailUser) {
      return res
        .status(43)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const checkDuplicatedUsername = async (req, res, next) => {
  try {
    const username = await User.findOne({ username: req.body.username }).exec();
    if (username) {
      return res
        .status(403)
        .send({ message: "Failed! Username is already in use!" });
    }

    next();
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

module.exports = {checkDuplicatedEmail, checkDuplicatedUsername}