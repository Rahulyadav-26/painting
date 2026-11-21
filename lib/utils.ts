/**
 * Format a price in USD ($) or INR (₹).
 */
export const formatPrice = (amount: number, currency: string = "USD"): string =>
  new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: currency === "INR" ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(amount);

/**
 * Calculate the discount percentage between original and sale price.
 */
export const discountPercent = (
  price: number,
  salePrice: number
): number => Math.round(((price - salePrice) / price) * 100);

/**
 * Conditionally join class names (tiny cn helper — avoids clsx dep).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Clamp a number between min and max.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
