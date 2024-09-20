const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  flightData: {
    type: Object,
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  flights: {
    type: [FlightSchema],
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
