var express = require("express");
var router = express.Router();
const tourController = require("../controllers/tourController");
const userController = require("./../controllers/userController");

router.route("/").get(tourController.getHomeTour);
// router.post("/contact-us", userController.contactUs);
router.post("/tours", tourController.filterTour);

module.exports = router;
