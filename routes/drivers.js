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

// Get Driver Vehicles
router.get("/:id/vehicles", async (req, res) => {
  try {
    const vehicles = await Driver.find({ _id: req.params.id }).populate(
      "vehicles"
    );
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
