import { products } from "../data/products";
import type { OrderItem } from "@/lib/orderService";

export interface VerifiedOrderPricing {
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
}

/**
 * Server-Side Price Verification (Fix for SEC-02)
 *
 * Guarantees that item prices, subtotals, shipping fees, and grand totals
 * are strictly determined from the authorized catalog on the server.
 * Completely ignores any untrusted client-supplied prices.
 */
export function calculateVerifiedOrderPricing(rawItems: any[]): VerifiedOrderPricing {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("Order must contain at least one artwork item.");
  }

  let subtotal = 0;
  const items: OrderItem[] = rawItems.map((rawItem) => {
    const pId = String(rawItem.product?.id || rawItem.productId || "").trim();
    const pSlug = String(rawItem.product?.slug || rawItem.slug || "").trim();

    const product = products.find((p) => p.id === pId || (pSlug && p.slug === pSlug));

    if (!product) {
      throw new Error(`Artwork not found in catalog (ID: ${pId || pSlug || "unknown"})`);
    }

    const isDigital = product.category === "Daily Planner" || product.medium?.includes("Digital");
    const verifiedUnitPrice = product.salePrice ?? product.price;
    const qty = Math.max(1, Math.min(10, Math.floor(Number(rawItem.quantity) || 1)));
    subtotal += verifiedUnitPrice * qty;

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

  const allDigital = items.every((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product?.category === "Daily Planner" || product?.medium?.includes("Digital");
  });

  const qualifiesForFreeShipping = subtotal >= 35 || allDigital;
  const shippingFee = subtotal === 0 || qualifiesForFreeShipping ? 0 : 5;
  const totalPrice = subtotal + shippingFee;

  return {
    items,
    subtotal,
    shippingFee,
    totalPrice,
  };
}
