const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle");

// Get all
router.get("/", async (req, res) => {
  try {
    const vehicle = await Vehicle.find();
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
