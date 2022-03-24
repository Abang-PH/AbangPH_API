const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./user").userSchema;

const driverSchema = new Schema(
  {
    userInfo: UserSchema,
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    isLGUVerified: {
      type: Boolean,
      default: false,
    },
    hasLicense: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
