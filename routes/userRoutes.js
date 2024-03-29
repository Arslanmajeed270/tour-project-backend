const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const fileUpload = require("../utils/Uploadimage");

const router = express.Router();

router.post("/register", authController.signup);
router.post("/login", authController.login);
router.post("/verify/:id", userController.verifyUser);

router.use(authController.protect);

router.get("/booking", userController.checkBooking);

router.patch(
  "/profile/:id",
  fileUpload.uploadUserPhoto,
  fileUpload.resizeUserPhoto,
  userController.updateUserProfile
);

router.post("/contact-us", userController.contactUs);

// router.get('/logout', authController.logout);

// Protect all routes after this middleware
// router.use(authController.protect);

// router.patch('/updateMyPassword', authController.updatePassword);
// router.get('/me', userController.getMe, userController.getUser);
// router.patch(
//   '/updateMe',
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );

// router.delete("/deleteMe", userController.deleteMe);

// router.use(authController.restrictTo("admin"));

// router
//   .route("/")
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
