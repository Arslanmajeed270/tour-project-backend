const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const uploadUtil = require("../utils/cloudinary");

// works while updating picture and when not updating photo
exports.updateUserProfile = factory.updateOne(User);

// works
exports.createUser = async (uid, email) => {
  const newUser = await new User({ uid, email }).save();
  return newUser;
};
