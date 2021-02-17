var express = require("express");
var router = express.Router();
const agencyController = require("./../controllers/agencyController");
const fileUpload = require("../utils/Uploadimage");
const authController = require("./../controllers/authController");

router.use(authController.protect);

router.post("/signup", authController.signup);

router.patch(
  "/profile/:id",
  fileUpload.uploadAgencyPhoto,
  fileUpload.handleAgencyImages,
  agencyController.updateAgencyProfile
);

router.post("/verify/:id", agencyController.VerifyAgency);

module.exports = router;
