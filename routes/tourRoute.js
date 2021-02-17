var express = require("express");
var router = express.Router();
const tourController = require("../controllers/tourController");
const authController = require("./../controllers/authController");
const fileUpload = require("../utils/Uploadimage");
const reviewRouter = require("./../routes/reviewRoutes");

router.use(authController.protect);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("agency"),
    fileUpload.uploadTourPhoto,
    fileUpload.resizeTourImages,
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("agency", "admin"),
    fileUpload.uploadTourPhoto,
    fileUpload.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("agency", "admin"),
    tourController.deleteTour
  );
module.exports = router;
