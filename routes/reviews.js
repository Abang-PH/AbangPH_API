const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// Get all
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getReview, (req, res) => {
  res.json(res.review);
});

//Creating one
router.post("/", async (req, res) => {
  const review = new Review({
    message: req.body.message,
    driverInfo: req.body.driverInfo,
    userInfo: req.body.userInfo,
  });

  try {
    const newReview = await review.save();
    // 201 newly created
    res.status(201).json(newReview);
  } catch (err) {
    // 400 bad user input
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// Middleware
async function getReview(req, res, next) {
  let review;
  try {
    review = await Review.findById(req.params.id);
    if (review == null) {
      // 404 - unable to find something
      return res.status(404).json({ message: "Cannot find review" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.review = review;
  next();
}
