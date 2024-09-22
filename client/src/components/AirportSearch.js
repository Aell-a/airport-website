"use client";

import { useState, useEffect, useRef } from "react";
import { Plane } from "lucide-react";
import { Input } from "@/components/ui/input";

const data = require("../data/airportData.json");

export default function AirportSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (query.length > 1) {
      const filteredAirports = data
        .filter(
          (airport) =>
            airport.name.toLowerCase().includes(query.toLowerCase()) ||
            airport.city.toLowerCase().includes(query.toLowerCase()) ||
            airport.country.toLowerCase().includes(query.toLowerCase()) ||
            airport.IATA.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredAirports);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (airport) => {
    setSelectedAirport(airport);
    setQuery(airport.name + "(" + airport.IATA + ")");
    setSuggestions([]);
    onSelect(airport.IATA);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Plane
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          id="airport"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search airports by name, city, country, or IATA code"
          className="pl-10 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
        >
          {suggestions.map((airport) => (
            <div
              key={airport.name}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(airport)}
            >
              <div className="font-medium">{airport.name}</div>
              <div className="text-sm text-gray-500">
                {airport.city}, {airport.country} ({airport.IATA})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
