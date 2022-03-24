const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DriverSchema = require("./driver").driverSchema;

const vehicleSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
    },
    type: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    plateNumber: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
