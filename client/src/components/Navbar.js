"use client";
import { Button } from "@/components/ui/button";
import { PlaneIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import AuthPopup from "@/components/AuthPopup";
import { signup } from "@/lib/api";

export default function Navbar() {
  const { user, logout, login } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const handleLogin = async (email, password) => {
    await login(email, password);
    setShowAuthPopup(false);
  };

  const handleSignup = async (email, password) => {
    await signup(email, password);
    setShowAuthPopup(false);
  };

  // Navbar component handles with routing in our website.
  // This component is where we render the AuthPopup as needed since navbar is shared across the whole app.

  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-900 to-purple-800 w-full">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <PlaneIcon size={50} className="mr-2 text-purple-300" />
          <div>
            <span className="text-2xl font-bold tracking-tight text-gray-200">
              Scanpol
            </span>
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
        >
          <Link href="/profile">My Flights</Link>
        </Button>
        {user ? (
          <Button
            variant="ghost"
            className="text-purple-200 hover:text-white hover:bg-purple-700"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <UserCircleIcon
            className="text-purple-300 hover:text-white cursor-pointer"
            size={35}
            onClick={() => setShowAuthPopup(true)}
          />
        )}
      </div>
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </nav>
  );
}
