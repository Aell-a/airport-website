const mongoose = require("mongoose");

// Our User model which defines the way that we hold data in MongoDB.

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
    type: [Object],
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
