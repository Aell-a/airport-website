"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightList from "@/components/FlightList";
import AuthPopup from "@/components/AuthPopup";
import ProfilePage from "@/components/ProfilePage";
import { login, signup, updateProfile } from "@/lib/api";

export default function FlightSearchApp() {
  const [flights, setFlights] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSearch = (airport, date, isArriving) => {
    setIsLoading(true);
    // TODO: Implement actual API call here
    setTimeout(() => {
      setFlights([
        {
          flightNumber: "FL123",
          airline: "SkyQuest Airways",
          time: "06:00 AM",
          otherAirport: "JFK",
          flightTime: "2h 30m",
          price: 299,
          isArriving: isArriving,
        },
        {
          flightNumber: "FL456",
          airline: "Ocean Air",
          time: "09:15 AM",
          otherAirport: "LAX",
          flightTime: "5h 30m",
          price: 349,
          isArriving: isArriving,
        },
        {
          flightNumber: "FL789",
          airline: "Mountain Express",
          time: "11:30 AM",
          otherAirport: "ORD",
          flightTime: "3h 15m",
          price: 279,
          isArriving: isArriving,
        },
        {
          flightNumber: "FL101",
          airline: "Sunshine Airlines",
          time: "2:00 PM",
          otherAirport: "MIA",
          flightTime: "3h 45m",
          price: 199,
          isArriving: isArriving,
        },
        {
          flightNumber: "FL202",
          airline: "Northern Lights Air",
          time: "4:30 PM",
          otherAirport: "SEA",
          flightTime: "4h 15m",
          price: 329,
          isArriving: isArriving,
        },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  const sortedFlights = useMemo(() => {
    const flightsCopy = [...flights];
    switch (sortBy) {
      case "price":
        return flightsCopy.sort((a, b) => a.price - b.price);
      case "duration":
        return flightsCopy.sort((a, b) => {
          const getDuration = (flight) => {
            const [hours, minutes] = flight.flightTime.split("h ");
            return parseInt(hours) * 60 + parseInt(minutes);
          };
          return getDuration(a) - getDuration(b);
        });
      case "time":
        return flightsCopy.sort((a, b) => {
          return (
            new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
          );
        });
      default: // 'recommended' - sort by time
        return flightsCopy.sort((a, b) => {
          return (
            new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
          );
        });
    }
  }, [flights, sortBy]);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("token");
      }
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      console.log(response);
      setUser(response.data.email);
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
      console.log(response);
      setUser(response.data.token);
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
      setUser(response.data);
      setShowProfilePage(false);
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
      style={{ backgroundImage: "url('../public/background.jpg')" }}
    >
      <div className="min-h-screen bg-white/80 backdrop-blur-sm">
        <Navbar
          onMyFlights={handleAuthAction}
          onProfileClick={handleAuthAction}
          user={user}
        />
        <main className="container mx-auto px-4 pb-12">
          <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
          <FlightList
            flights={sortedFlights}
            sortBy={sortBy}
            onSortChange={setSortBy}
            isLoading={isLoading}
            onBookFlight={handleBookFlight}
          />
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
