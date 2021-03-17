const Agency = require("../models/agencyModel");
const catchAsync = require("../utils/catchAsync");
const uploadUtil = require("../utils/cloudinary");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");

// works
exports.updateAgencyProfile = async (req, res, next) => {
  const doc = await Agency.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });

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

// works
exports.CreateAgency = async (uid, email, name) => {
  const newAgency = await new Agency({ uid, email, name }).save();
  return newAgency;
};

// works
exports.VerifyAgency = factory.updateOne(Agency);

// works
exports.getAgency = factory.getOne(Agency);
