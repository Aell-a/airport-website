import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Plane,
  Search,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";
import PlaneAnimation from "./PlaneAnimation";

export default function FlightSearchForm({ onSearch, isLoading }) {
  const [isArriving, setIsArriving] = useState(false);
  const [airport, setAirport] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(airport, date, isArriving);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-12 bg-white/90 shadow-lg rounded-xl overflow-hidden">
      <CardContent className="grid gap-6 p-8">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Switch
              id="flightDirection"
              checked={isArriving}
              onCheckedChange={setIsArriving}
              className="bg-[hsl(var(--switch-unchecked))] data-[state=checked]:bg-[hsl(var(--switch-checked))]"
            ></Switch>
            <Label
              htmlFor="flightDirection"
              className="text-sm font-medium text-gray-700"
            >
              {isArriving ? "Arriving Flights" : "Departing Flights"}
            </Label>
          </div>
          {isArriving ? (
            <PlaneLanding className="text-purple-600 ml-2" size={24} />
          ) : (
            <PlaneTakeoff className="text-purple-600 ml-2" size={24} />
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="airport"
            className="text-sm font-medium text-gray-700"
          >
            Airport
          </Label>
          <div className="relative">
            <Plane
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="airport"
              value={airport}
              onChange={(e) => setAirport(e.target.value)}
              placeholder="Search airports"
              className="pl-10 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date
          </Label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <PlaneAnimation />
          ) : (
            <>
              <Search className="mr-2" size={18} />
              Search Flights
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
