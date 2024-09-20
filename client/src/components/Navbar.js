import { Button } from "@/components/ui/button";
import { PlaneIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar({ onMyFlights, onProfileClick, user }) {
  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <PlaneIcon size={50} className="mr-2 text-purple-300" />
          <div>
            <span className="text-2xl font-bold tracking-tight">Scanpol</span>
            <p className="text-xs text-gray-300">
              Your flight scanner for Amsterdam Schiphol Airport
            </p>
          </div>
        </div>
      </Link>
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
          size={35}
          onClick={onProfileClick}
        />
      </div>
    </nav>
  );
}
