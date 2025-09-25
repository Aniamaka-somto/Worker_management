import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// filepath: frontend/src/lib/utils.ts
export async function getWorkers() {
  const res = await fetch("http://localhost:3001/api/workers/workers");
  if (!res.ok) throw new Error("Failed to fetch workers");
  return res.json();
}
