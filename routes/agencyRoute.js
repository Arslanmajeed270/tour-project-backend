var express = require("express");
var router = express.Router();
const agencyController = require("./../controllers/agencyController");
const fileUpload = require("../utils/Uploadimage");
const authController = require("./../controllers/authController");
const tourController = require("../controllers/tourController");

router.post("/login", authController.login);
router.post("/register", authController.signup);

router.use(authController.protect);

router.patch(
  "/profile/:id",
  fileUpload.uploadAgencyPhoto,
  fileUpload.handleAgencyImages,
  agencyController.updateAgencyProfile
);

router.post("/verify/:id", agencyController.VerifyAgency);

router
  .route("/tour/:id")
  .get(tourController.getTour)
  .patch(
    // authController.restrictTo("agency"),
    fileUpload.uploadTourPhoto,
    fileUpload.resizeTourImages,
    tourController.updateTour
  )
  .delete(authController.restrictTo("agency"), tourController.deleteTour);

router
  .get("/tours", tourController.getAgencyTours)
  .post(
    "/tour",
    authController.restrictTo("agency"),
    fileUpload.uploadTourPhoto,
    fileUpload.resizeTourImages,
    tourController.createTour
  );

router.route("/tour/discount-tour").post(tourController.createDiscountTour);

module.exports = router;
