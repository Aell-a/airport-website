import { PlaneIcon } from "lucide-react";

// Just a small animation on search button.

export default function PlaneAnimation() {
  return (
    <div className="relative w-16 h-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-1 bg-white rounded-full"></div>
      </div>
      <PlaneIcon
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white animate-fly-1"
        size={16}
      />
      <PlaneIcon
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white animate-fly-2"
        size={16}
      />
    </div>
  );
}
