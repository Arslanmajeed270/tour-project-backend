var express = require("express");
var router = express.Router();
const tourController = require("../controllers/tourController");

router.route("/").get(tourController.getHomeTour);

module.exports = router;
