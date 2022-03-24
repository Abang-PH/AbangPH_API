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
      required: true,
      default: Date.now,
    },
    userType: {
      type: String,
      enum: ["commuter", "driver"],
      default: "commuter",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
