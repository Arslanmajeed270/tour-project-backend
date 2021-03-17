const mongoose = require("mongoose");
const validator = require("validator");

const agencySchema = new mongoose.Schema(
  {
    uid: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: Number,
    },
    photo: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    location: {
      type: String,
    },
    document: [
      {
        type: String,
      },
    ],
    role: {
      type: String,
      default: "agency",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
