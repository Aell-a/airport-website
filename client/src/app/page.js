"use client";

import { useState, useMemo } from "react";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightList from "@/components/FlightList";
import AuthPopup from "@/components/AuthPopup";
import { saveFlight, searchFlights, unsaveFlight } from "@/lib/api";
import { airlineData } from "@/data/airlines";
import bg from "../app/public/background.jpg";
import { useAuth } from "@/lib/auth";

export default function FlightSearchApp() {
  const [flights, setFlights] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const { user, login, signup } = useAuth();

  // handleSearch does the api call with the user inputs coming from FlightSearchForm component and maps the incoming flight data.
  const handleSearch = async (airport, date, isArriving) => {
    setIsLoading(true);
    try {
      const response = await searchFlights(
        airport,
        date.toISOString().slice(0, 10),
        isArriving
      );
      if (response.data) {
        const data = response.data.flights.map((flight) => ({
          id: flight.id,
          flightNumber: flight.flightName,
          airline: getAirline(flight.prefixIATA),
          time: flight.scheduleTime.slice(0, 5),
          isArriving: flight.flightDirection === "A" ? true : false,
          otherAirport: flight.route.destinations[0],
          price: Math.round(Math.random() * 100) + 100,
          saved: false,
        }));

        setFlights(data);
        setIsLoading(false);
      } else {
        console.error("Flights not found");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed. Please try again.");
      setIsLoading(false);
    }
  };

  // sortedFlights sorts the flights based on price or departure time.
  const sortedFlights = useMemo(() => {
    const flightsCopy = [...flights];
    switch (sortBy) {
      case "price":
        return flightsCopy.sort((a, b) => a.price - b.price);
      case "time":
        return flightsCopy.sort((a, b) => {
          return (
            new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
          );
        });
      default:
        return flightsCopy.sort((a, b) => {
          return (
            new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
          );
        });
    }
  }, [flights, sortBy]);

  // getAirline finds the airline's actual name from the airlines.js file from the IATA code that gets sent by API.
  const getAirline = (code) => {
    const airline = airlineData.find((airline) => airline.iata === code);
    return airline ? airline.name : "Unknown";
  };

  // handleSaveFlight changes saved property of the flight and sends a request to server to save flight data once user clicks the save button.
  const handleSaveFlight = async (flight) => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      const token = localStorage.getItem("token");
      const updatedFlight = { ...flight, saved: !flight.saved };
      const flightId = updatedFlight.id;
      try {
        const response = updatedFlight.saved
          ? await saveFlight(updatedFlight, token)
          : await unsaveFlight(flightId, token);
        if (response.status === 200) {
          setFlights((prevFlights) =>
            prevFlights.map((f) =>
              f.flightNumber === flight.flightNumber ? updatedFlight : f
            )
          );
        } else {
          return;
        }
      } catch (error) {
        console.error("Error saving flight:", error);
        setFlights((prevFlights) =>
          prevFlights.map((f) =>
            f.flightNumber === flight.flightNumber ? flight : f
          )
        );
      }
    }
  };

  return (
    <div
      className="flex-grow bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="min-h-full bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
          {flights.length > 0 && (
            <FlightList
              flights={sortedFlights}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isLoading={isLoading}
              onSave={handleSaveFlight}
            />
          )}
        </div>
        {showAuthPopup && (
          <AuthPopup
            onClose={() => setShowAuthPopup(false)}
            onLogin={login}
            onSignup={signup}
          />
        )}
      </div>
    </div>
  );
}
