const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  name: {
    type: String,
    // required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  Photo: {
    type: String,
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
