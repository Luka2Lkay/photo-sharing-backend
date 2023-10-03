const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }, 
  },

  { timestamps: true }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("userModel", userSchema);
