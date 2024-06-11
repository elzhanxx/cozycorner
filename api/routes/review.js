const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");
const {
    createReview,
    getReviewsForPlace,
} = require("../controllers/reviewController");

router.route("/").post(isLoggedIn, createReview);
router.route("/:placeId").get(getReviewsForPlace);

module.exports = router;
