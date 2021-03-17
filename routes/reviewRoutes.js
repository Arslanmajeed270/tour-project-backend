const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/:tourId/review")
  // get review of specific tour
  .get(reviewController.getAllReviews)
  // create review of specific tour
  .post(
    // authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

// To Update and Delete Reviews

router
  .route("/review/:id")
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

module.exports = router;
