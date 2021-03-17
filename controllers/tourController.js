const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Tour = require("../models/tourModel");
const Discount = require("../models/catagory/discountModel");
const factory = require("./handlerFactory");

exports.createTour = factory.createOne(Tour);
exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: "reviews" });
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getAgencyTours = catchAsync(async (req, res, next) => {
  let filter = { agency: req.user.id };

  let doc = Tour.find(filter);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getHomeTour = catchAsync(async (req, res, next) => {
  const tours = await Tour.find().limit(9);
  const discountedTours = await Discount.find().populate("tour").limit(9);

  if (!tours && !discountedTours) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      discountedTours,
      tours,
    },
  });
});

exports.createDiscountTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.body.tour);
  const { discountPrice, specialOffer } = req.body;
  req.body.tour = tour;
  const doc = await Discount.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});
