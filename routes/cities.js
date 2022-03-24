const express = require("express");
const router = express.Router();
const City = require("../models/city");

// Get all
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getCity, (req, res) => {
  res.json(res.city);
});

//Creating one
router.post("/", async (req, res) => {
  const city = new City({
    name: req.body.name,
  });

  try {
    const newCity = await city.save();
    // 201 newly created
    res.status(201).json(newCity);
  } catch (err) {
    // 400 bad user input
    res.status(400).json({ message: err.message });
  }
});

//Updating one
router.patch("/:id", getCity, async (req, res) => {
  if (req.body.name != null) {
    res.city.name = req.body.name;
  }
  try {
    const updatedCity = await res.user.save();
    res.json(updatedCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// Middleware
async function getCity(req, res, next) {
  let city;
  try {
    city = await City.findById(req.params.id);
    if (city == null) {
      // 404 - unable to find something
      return res.status(404).json({ message: "Cannot find city" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.city = city;
  next();
}
