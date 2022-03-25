const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    userType: {
      type: String,
      enum: ["commuter", "driver"],
      default: "commuter",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
