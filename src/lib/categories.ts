// ========================================================
// File: src/lib/categories.ts
// Purpose: Standard Master Categories for LucknowKaChaska
// ========================================================

export const CATEGORIES = [
  "Restaurants & Hotels",
  "Street Food",
  "Lucknowi Special",
  "Cafes & Bakeries",
  "Dhaba & Local Food",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isValidCategory(val: string): val is Category {
  return (CATEGORIES as readonly string[]).includes(val);
}
