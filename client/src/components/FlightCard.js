import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";

export default function FlightCard({ flight, onBookFlight }) {
  return (
    <Card className="mb-6 bg-white/90 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
      <CardContent className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <p className="font-bold text-xl text-gray-800">{flight.time}</p>
            <p className="text-sm text-gray-600">
              {flight.isArriving ? "Arrives" : "Departs"}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">{flight.flightTime}</p>
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
          <p className="font-bold text-2xl text-purple-600">${flight.price}</p>
          <p className="text-sm text-gray-500">{flight.airline}</p>
          <p className="text-xs text-gray-400">{flight.flightNumber}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-100">
        <Button
          onClick={() => onBookFlight(flight)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105"
        >
          Book Flight
        </Button>
      </CardFooter>
    </Card>
  );
}
