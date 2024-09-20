const express = require("express");
const router = express.Router();
const axios = require("axios");
const SavedFlight = require("../models/SavedFlight");

router.get("/destinations", async (req, res) => {
  try {
    const input = req.body;
    const response = await axios.get(
      "https://airports-by-api-ninjas.p.rapidapi.com/v1/airports",
      {
        headers: {
          "x-rapidapi-key":
            "d38a48d31fmsh53a48c09b29e545p1ca591jsn65e998c6251d",
          "x-rapidapi-host": "airports-by-api-ninjas.p.rapidapi.com",
        },
        params: {
          name: input,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching destinations:", err);
    res.status(500).send("Error fetching destinations");
  }
});

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
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.flights.push({ flightData: req.body.flightData });
    await user.save();

    res.json(user.flights[user.flights.length - 1]);
  } catch (err) {
    console.error("Error saving flight:", err);
    res.status(500).send("Error saving flight");
  }
});

// Get saved flights for a user
router.get("/saved", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user.flights);
  } catch (err) {
    console.error("Error fetching saved flights:", err);
    res.status(500).send("Error fetching saved flights");
  }
});

module.exports = router;
