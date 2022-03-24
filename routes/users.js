const express = require("express");
const driver = require("../models/driver");
const router = express.Router();
const User = require("../models/user").User;
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");

// Get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//Creating one
router.post("/", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    userType: req.body.userType,
  });

  try {
    const newUser = await user.save();
    // 201 newly created
    if (newUser.userType === "driver") {
      const { isVaccinated, isVerified, driverVehicle } = req.body;
      const vehicle = await insertVehicleDetails(
        driverVehicle.type,
        driverVehicle.model,
        driverVehicle.plateNumber,
        driverVehicle.capacity
      );
      const newDriver = await insertDriverDetails(
        newUser,
        isVaccinated,
        isVerified,
        [vehicle]
      );
      res.status(201).json(newDriver);
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    // 400 bad user input
    res.status(400).json({ message: err.message });
  }
});

//Updating one
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.birthDate != null) {
    res.user.birthDate = req.body.birthDate;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// Middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      // 404 - unable to find something
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

// Insert Driver Details
const insertDriverDetails = async (
  userInfo,
  isVaccinated,
  isVerified,
  vehicles
) => {
  const newDriver = new Driver({
    userInfo,
    isVaccinated,
    isVerified,
    vehicles,
  });
  return newDriver.save();
};

// Insert Vehicle Details
const insertVehicleDetails = async (type, model, plateNumber, capacity) => {
  const newVehicle = new Vehicle({
    type,
    model,
    plateNumber,
    capacity,
  });
  return newVehicle.save();
};
