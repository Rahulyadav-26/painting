import { products } from "../data/products";
import type { OrderItem } from "@/lib/orderService";

export const USD_TO_INR_RATE = Number(process.env.NEXT_PUBLIC_USD_TO_INR_RATE) || 90;

export const convertUsdToInr = (usdAmount: number, rate = USD_TO_INR_RATE): number => {
  return Math.round(usdAmount * rate);
};

export interface VerifiedOrderPricing {
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  totalInr: number;
}

/**
 * Server-Side Price Verification (Fix for SEC-02)
 *
 * Guarantees that item prices, subtotals, shipping fees, and grand totals
 * are strictly determined from the authorized catalog on the server.
 * Completely ignores any untrusted client-supplied prices.
 */
export function calculateVerifiedOrderPricing(
  rawItems: any[],
  paymentMethod?: string
): VerifiedOrderPricing {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("Order must contain at least one artwork item.");
  }

  let subtotal = 0;
  let totalInr = 0;
  const items: OrderItem[] = rawItems.map((rawItem) => {
    const pId = String(rawItem.product?.id || rawItem.productId || "").trim();
    const pSlug = String(rawItem.product?.slug || rawItem.slug || "").trim();

    const product = products.find((p) => p.id === pId || (pSlug && p.slug === pSlug));

    if (!product) {
      throw new Error(`Artwork not found in catalog (ID: ${pId || pSlug || "unknown"})`);
    }

    const verifiedUnitPrice = product.salePrice ?? product.price;
    const qty = Math.max(1, Math.min(10, Math.floor(Number(rawItem.quantity) || 1)));
    subtotal += verifiedUnitPrice * qty;

    const unitInr = product.currency === "INR" ? verifiedUnitPrice : convertUsdToInr(verifiedUnitPrice);
    totalInr += unitInr * qty;

    return {
      productId: product.id,
      title: product.title,
      artist: product.artist,
      price: verifiedUnitPrice,
      quantity: qty,
      image: product.images[0] || "",
      slug: product.slug,
    };
  });

  const isPhysical = paymentMethod ? (
    paymentMethod.toLowerCase().includes("physical") ||
    paymentMethod.toLowerCase().includes("cod") || 
    paymentMethod.toLowerCase().includes("cash on delivery")
  ) : false;

  const shippingFee = isPhysical ? (totalInr >= 500 ? 0 : 80) : 0;
  const totalPrice = subtotal + shippingFee;
  totalInr += shippingFee;

  return {
    items,
    subtotal,
    shippingFee,
    totalPrice,
    totalInr,
  };
}
