const Agency = require("../models/agencyModel");
const catchAsync = require("../utils/catchAsync");
const uploadUtil = require("../utils/cloudinary");
const factory = require("./handlerFactory");

// works
exports.updateAgencyProfile = async (req, res, next) => {
  const { profilePhoto, images } = req.body;

  let url = await uploadUtil.Upload(
    "agency",
    profilePhoto.path,
    profilePhoto.filename
  );

  const imagesUrl = [];

  await Promise.all(
    images.map(async (file, i) => {
      const url = await uploadUtil.Upload("agency", file.path, file.filename);
      imagesUrl.push(url);
    })
  );

  req.body.photo = url;
  req.body.document = imagesUrl;

  const doc = await Agency.findOneAndUpdate({ uid: req.params.id }, req.body, {
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
