import { Button } from "@/components/ui/button";
import { PlaneIcon, UserCircleIcon } from "lucide-react";

export default function Navbar({ onMyFlights, onProfileClick, user }) {
  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
      <div className="flex items-center">
        <PlaneIcon className="mr-2 text-purple-300" />
        <span className="text-2xl font-bold tracking-tight">SkyQuest</span>
      </div>
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          className="text-purple-200 hover:text-white hover:bg-purple-700"
          onClick={onMyFlights}
        >
          My Flights
        </Button>
        <UserCircleIcon
          className="text-purple-300 hover:text-white cursor-pointer"
          size={28}
          onClick={onProfileClick}
        />
        {user && <span className="text-purple-200">{user.email}</span>}
      </div>
    </nav>
  );
}
