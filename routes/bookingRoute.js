var express = require("express");
var router = express.Router();
const bookingController = require("../controllers/bookingController");
const fileUpload = require("../utils/Uploadimage");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.route("/create-booking").post(
  // authController.restrictTo("user"),
  bookingController.createBooking
);
module.exports = router;
