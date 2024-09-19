const express = require("express");
const router = express.Router();
const axios = require("axios");
const SavedFlight = require("../models/SavedFlight");

// Get flights from Schiphol API
router.get("/search", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.schiphol.nl/public-flights/flights",
      {
        headers: {
          Accept: "application/json",
          app_id: process.env.SCHIPHOL_APP_ID,
          app_key: process.env.SCHIPHOL_APP_KEY,
          ResourceVersion: v4,
        },
        params: req.query, // Pass any query parameters from the client
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
    const newSavedFlight = new SavedFlight({
      user: req.user.id, // Assuming you have authentication middleware
      flightData: req.body.flightData,
    });
    await newSavedFlight.save();
    res.json(newSavedFlight);
  } catch (err) {
    console.error("Error saving flight:", err);
    res.status(500).send("Error saving flight");
  }
});

// Get saved flights for a user
router.get("/saved", async (req, res) => {
  try {
    const savedFlights = await SavedFlight.find({ user: req.user.id });
    res.json(savedFlights);
  } catch (err) {
    console.error("Error fetching saved flights:", err);
    res.status(500).send("Error fetching saved flights");
  }
});

module.exports = router;
