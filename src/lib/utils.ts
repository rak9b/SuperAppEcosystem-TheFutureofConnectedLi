import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useStore } from "../store/useStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  // This is a helper to access store outside of components (not ideal but works for simple utils)
  // In a real app, we'd pass currency as a prop or use a hook.
  // For now, we'll default to USD formatting, but you can expand this.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  BDT: '৳'
};
