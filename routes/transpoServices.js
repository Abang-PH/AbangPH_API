const express = require("express");
const router = express.Router();
const TranspoService = require("../models/transpoService");

// Get all
router.get("/", async (req, res) => {
  try {
    const transpoServices = await TranspoService.find();
    res.json(transpoServices);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getTranspoService, (req, res) => {
  res.json(res.transpoService);
});

//Creating one
router.post("/", async (req, res) => {
  const transpoService = new TranspoService({
    name: req.body.name,
    citiesAvailable: req.body.citiesAvailable,
  });

  try {
    const newTranspoService = await transpoService.save();
    // 201 newly created
    res.status(201).json(newTranspoService);
  } catch (err) {
    // 400 bad user input
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// Middleware
async function getTranspoService(req, res, next) {
  let transpoService;
  try {
    transpoService = await City.findById(req.params.id);
    if (transpoService == null) {
      // 404 - unable to find something
      return res.status(404).json({ message: "Cannot find transpo service" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.transpoService = transpoService;
  next();
}
