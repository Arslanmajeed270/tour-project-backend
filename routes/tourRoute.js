var express = require("express");
var router = express.Router();
const tourController = require("../controllers/tourController");
const authController = require("./../controllers/authController");
const fileUpload = require("../utils/Uploadimage");

router.route("/:id").get(tourController.getTour);

module.exports = router;
