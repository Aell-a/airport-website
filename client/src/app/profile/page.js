"use client";
import bg from "../public/background.jpg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";

const savedFlights = [
  {
    id: 1,
    flightNumber: "FL123",
    airline: "SkyQuest Airways",
    time: "2023-07-15 06:00 AM",
    otherAirport: "JFK",
    flightTime: "2h 30m",
    price: 299,
    isArriving: false,
  },
  {
    id: 2,
    flightNumber: "FL456",
    airline: "Ocean Air",
    time: "2023-07-20 09:15 AM",
    otherAirport: "LAX",
    flightTime: "5h 30m",
    price: 349,
    isArriving: true,
  },
  {
    id: 3,
    flightNumber: "FL789",
    airline: "Mountain Express",
    time: "2023-08-05 11:30 AM",
    otherAirport: "ORD",
    flightTime: "3h 15m",
    price: 279,
    isArriving: false,
  },
];

export default function ProfilePage() {
  const [sortBy, setSortBy] = useState("date");

  const sortedFlights = [...savedFlights].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });
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

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Saved Flights
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                You have {savedFlights.length} saved flights.
              </p>

              <div className="flex justify-end mb-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Most Upcoming</SelectItem>
                    <SelectItem value="price">Cheapest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {sortedFlights.map((flight) => (
                <Card
                  key={flight.id}
                  className="mb-6 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <CardContent className="flex justify-between items-center p-6">
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="font-bold text-xl text-gray-800">
                          {new Date(flight.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(flight.time).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-500">
                          {flight.flightTime}
                        </p>
                        <div className="w-32 h-px bg-gray-300 my-2 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
                        </div>
                        {flight.isArriving ? (
                          <PlaneLanding className="text-purple-500" size={20} />
                        ) : (
                          <PlaneTakeoff className="text-purple-500" size={20} />
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-xl text-gray-800">
                          {flight.otherAirport}
                        </p>
                        <p className="text-sm text-gray-600">
                          {flight.isArriving ? "From" : "To"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-purple-600">
                        ${flight.price}
                      </p>
                      <p className="text-sm text-gray-500">{flight.airline}</p>
                      <p className="text-xs text-gray-400">
                        {flight.flightNumber}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t border-gray-100">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                      Manage Booking
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
