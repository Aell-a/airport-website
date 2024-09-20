const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get("/search", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.schiphol.nl/public-flights/flights",
      {
        headers: {
          Accept: "application/json",
          app_id: process.env.SCHIPHOL_APP_ID,
          app_key: process.env.SCHIPHOL_APP_KEY,
          ResourceVersion: "v4",
        },
        params: {
          scheduleDate: req.query.date,
          route: req.query.airport,
          flightDirection: req.query.direction,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching flights:", err);
    res.status(500).send("Error fetching flights");
  }
});

// Save a flight for a user
router.post("/save", async (req, res) => {
  try {
    const token = req.body.token;
    const flight = req.body.flightData;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.flights.push(flight);
    await user.save();
    res.status(200).send("Flight saved");
  } catch (err) {
    console.error("Error saving flight:", err);
    return res.status(500).send("Error saving flight");
  }
});

router.post("/unsave", async (req, res) => {
  try {
    const token = req.body.token;
    const flightId = req.body.flightId;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (!flightId) {
      return res.status(400).json({ msg: "Flight ID is required" });
    }
    const filteredArray = user.flights.filter((f) => f.id !== flightId);
    user.flights = filteredArray;
    await user.save();
    res.status(200).send("Flight saved");
  } catch (err) {
    console.error("Error saving flight:", err);
    return res.status(500).send("Error saving flight");
  }
});

router.get("/saved", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");
    if (user.flights) {
      res.json(user.flights);
    } else {
      res.status(200).send("No saved flights");
    }
  } catch (err) {
    console.error("Error fetching saved flights:", err);
    res.status(500).send("Error fetching saved flights");
  }
});

module.exports = router;
