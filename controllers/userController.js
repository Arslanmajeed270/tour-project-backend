const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const uploadUtil = require("../utils/cloudinary");
const Booking = require("./../models/bookingModel");
const CustomFirebase = require("../utils/FirbaseFunctions");
const Contact = require("./../models/catagory/ContactModel");

// works while updating picture and when not updating photo
exports.updateUserProfile = factory.updateOne(User);

exports.verifyUser = catchAsync(async (req, res, next) => {
  CustomFirebase.sendEmailVerification();
  res.status(200).json({
    status: "success",
    message: "A link is send to your Email",
  });
});

// works
exports.createUser = async (uid, email, name) => {
  const newUser = await new User({ uid, email, name }).save();
  return newUser;
};

exports.checkBooking = catchAsync(async (req, res, next) => {
  let filter = { user: req.user.id };
  let notify = false;

  const doc = await Booking.find(filter);

  // if (doc.review == true) {
  //   notify = true;
  // } else {
  //   notify = false;
  // }

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.contactUs = catchAsync(async (req, res, next) => {
  let user = req.user;
  let message = req.body.message;

  const doc = await Contact({ user, message }).save();

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
