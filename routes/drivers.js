const express = require("express");
const router = express.Router();
const Driver = require("../models/driver");

// Get all
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
