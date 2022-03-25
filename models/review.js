const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  driverInfo: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
  },
  message: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
