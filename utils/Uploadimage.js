const multer = require("multer");
const AppError = require("./appError");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const uploadUtil = require("../utils/cloudinary");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("profilePhoto");

exports.uploadAgencyPhoto = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "documents", maxCount: 3 },
]);

exports.uploadTourPhoto = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "tourImages", maxCount: 5 },
]);

// Resizes the User Avatar Photo
exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file || Object.keys(req.file).length === 0) {
    return next();
  }

  req.file.filename = `user-${Date.now()}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/${req.file.filename}`);

  req.file.path = `uploads/${req.file.filename}`;

  const url = await uploadUtil.Upload("user", req.file.path, req.file.filename);
  req.body.Photo = url;

  next();
};

// Resizes the Tour Photos that the agency will create
exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (req.files.imageCover == null || req.files.tourImages == null) {
    return next();
  }

  // 1) Cover image
  if (req.files.imageCover != null) {
    req.files.imageCover[0].filename = `tour-${Date.now()}-cover`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/tours/${req.files.imageCover[0].filename}`);
    req.files.imageCover[0].path = `uploads/tours/${req.files.imageCover[0].filename}`;
    const url = await uploadUtil.Upload(
      "tour",
      req.files.imageCover[0].path,
      req.files.imageCover[0].filename
    );
    //  2) Images
    req.body.imageCover = url;
  }

  if (req.files.tourImages != null) {
    req.body.images = [];
    await Promise.all(
      req.files.tourImages.map(async (file, i) => {
        const filename = `tour-${Date.now()}-${i + 1}`;
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/tours/${filename}`);
        file.filename = filename;
        const url = await uploadUtil.Upload(
          "tour",
          (file.path = `uploads/tours/${filename}`),
          file.filename
        );
        req.body.images.push(url);
      })
    );
  }

  next();
});

// Handle agency profile images
exports.handleAgencyImages = catchAsync(async (req, res, next) => {
  if (!req.files.profilePhoto || !req.files.documents) return next();

  // 1) Cover image
  req.files.profilePhoto[0].filename = `agency-${Date.now()}-cover`;

  await sharp(req.files.profilePhoto[0].buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/agency/${req.files.profilePhoto[0].filename}`);

  req.files.profilePhoto[0].path = `uploads/agency/${req.files.profilePhoto[0].filename}`;
  // // 2) Images

  const images = [];

  await Promise.all(
    req.files.documents.map(async (file, i) => {
      const filename = `agency-${Date.now()}-${i + 1}`;
      await sharp(file.buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/agency/${filename}`);
      file.filename = filename;
      file.path = `uploads/agency/${filename}`;
      images.push(file);
    })
  );

  req.body.profilePhoto = req.files.profilePhoto[0];
  req.body.images = images;

  next();
});
