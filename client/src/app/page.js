"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightList from "@/components/FlightList";
import AuthPopup from "@/components/AuthPopup";
import ProfilePage from "@/components/ProfilePage";
import {
  getUser,
  login,
  searchFlights,
  signup,
  updateProfile,
} from "@/lib/api";
import { airlineData } from "@/data/airlines";
import bg from "../app/public/background.jpg";

export default function FlightSearchApp() {
  const [flights, setFlights] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      checkAuth();
    }
  }, [user, setUser]);

  const handleSearch = async (airport, date, isArriving) => {
    setIsLoading(true);
    try {
      const response = await searchFlights(airport, date, isArriving);
      console.log(response.data);
      if (response.data) {
        const data = response.data.flights.map((flight) => ({
          flightNumber: flight.flightName,
          airline: getAirline(flight.prefixIATA),
          time: flight.scheduleTime.slice(0, 5),
          isArriving: flight.flightDirection === "A" ? true : false,
          otherAirport: flight.route.destinations[0],
          price: Math.round(Math.random() * 100) + 100,
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

  const getAirline = (code) => {
    const airline = airlineData.find((airline) => airline.iata === code);
    return airline ? airline.name : "Unknown";
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await getUser(token);
        setUser(response.data.userId);
        setShowAuthPopup(false);
      } catch (error) {
        console.error("Matching ID cannot be found");
      }
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      setUser(response.data.userId);
      localStorage.setItem("token", response.data.token);
      setShowAuthPopup(false);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleSignup = async (email, password) => {
    try {
      const response = await signup(email, password);
      setUser(response.data.userId);
      localStorage.setItem("token", response.data.token);
      setShowAuthPopup(false);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleUpdateProfile = async (updatedUser) => {
    try {
      const response = await updateProfile(updatedUser);
      // setShowProfilePage(false);
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Profile update failed. Please try again.");
    }
  };

  const handleAuthAction = () => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      setShowProfilePage(true);
    }
  };

  const handleBookFlight = async (flight) => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      try {
        await api.post(
          "/flights/book",
          { flightId: flight.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Flight booked successfully!");
      } catch (error) {
        console.error("Booking error:", error);
        alert("Booking failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="min-h-screen bg-white/80 backdrop-blur-sm">
        <Navbar
          onMyFlights={handleAuthAction}
          onProfileClick={handleAuthAction}
          user={user}
        />
        <main className="container mx-auto px-4 pb-12">
          <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
          {flights.length > 0 && (
            <FlightList
              flights={sortedFlights}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isLoading={isLoading}
              onBookFlight={handleBookFlight}
            />
          )}
        </main>
        {showAuthPopup && (
          <AuthPopup
            onClose={() => setShowAuthPopup(false)}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
        {showProfilePage && user && (
          <ProfilePage
            user={user}
            onClose={() => setShowProfilePage(false)}
            onUpdate={handleUpdateProfile}
          />
        )}
      </div>
    </div>
  );
}
