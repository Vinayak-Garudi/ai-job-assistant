import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMatchColor(percentage: number): string {
  if (percentage >= 80)
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (percentage >= 60)
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
}

export function getMatchLabel(percentage: number): string {
  if (percentage >= 80) return "Excellent Match";
  if (percentage >= 60) return "Good Match";
  return "Needs Work";
}
