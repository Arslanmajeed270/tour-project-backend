const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");

const askReview = async (req, res, next) => {
  const doc = await Booking.find();

  //   doc.map(dc=>{
  //   });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
};

module.exports.askReview = askReview;
