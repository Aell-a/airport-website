import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// shadCN function
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
