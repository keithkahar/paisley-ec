import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number | string): string {
  const num = typeof value === "string" ? Number(value.replace(/[^0-9.-]/g, "")) : value;
  if (!Number.isFinite(num)) return String(value);
  return num.toLocaleString("en-US");
}

