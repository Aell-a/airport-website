import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";
import FlightCard from "./FlightCard";

export default function FlightList({
  flights,
  sortBy,
  onSortChange,
  isLoading,
  onBookFlight,
}) {
  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Available Flights</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price">Lowest Price</SelectItem>
              <SelectItem value="duration">Shortest Duration</SelectItem>
              <SelectItem value="time">Flight Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2Icon className="animate-spin text-purple-600" size={48} />
        </div>
      ) : (
        flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} onBookFlight={onBookFlight} />
        ))
      )}
    </div>
  );
}
