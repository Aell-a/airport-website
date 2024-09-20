"use client";
import bg from "../public/background.jpg";
import { useEffect, useState } from "react";
import { saveFlight, unsaveFlight, userFlights } from "@/lib/api";
import FlightList from "@/components/FlightList";

export default function ProfilePage() {
  const [sortBy, setSortBy] = useState("date");
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserFlights() {
      const token = localStorage.getItem("token");
      try {
        const response = await userFlights(token);
        setFlights(response.data);
      } catch (error) {
        console.error("Error while fetching user flights:", error);
      }
    }
    getUserFlights();
  }, []);

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const handleSaveFlight = async (flight) => {
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
  };

  return (
    <div
      className="flex-grow bg-cover bg-center h-screen "
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="min-h-full bg-white/80 backdrop-blur-sm">
        <div>
          <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-purple-800 mb-8">
              My Profile
            </h1>

            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
              <FlightList
                flights={sortedFlights}
                sortBy={sortBy}
                onSortChange={setSortBy}
                isLoading={isLoading}
                onSave={handleSaveFlight}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
