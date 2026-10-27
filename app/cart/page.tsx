"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag, ShieldCheck, Sparkles } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 350;

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent?: number; flat?: number } | null>(null);

  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FFF5F7]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF69B4]" />
        </div>
      </MainLayout>
    );
  }

  const rawSubtotal = totalPrice();
  const qualifiesForFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = rawSubtotal === 0 || qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);
  const shippingProgressPct = Math.min(100, Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.percent) {
      discountAmount = Math.round((rawSubtotal * appliedDiscount.percent) / 100);
    } else if (appliedDiscount.flat) {
      discountAmount = Math.min(rawSubtotal, appliedDiscount.flat);
    }
  }

  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "WHIMSY10") {
      setAppliedDiscount({ code: "WHIMSY10", percent: 10 });
      addToast("Coupon 'WHIMSY10' applied! 10% discount added. ✨", "success");
    } else if (code === "FIRSTART") {
      setAppliedDiscount({ code: "FIRSTART", flat: 500 });
      addToast("Coupon 'FIRSTART' applied! ₹500 discount added. ✨", "success");
    } else if (code === "ARTLOVE") {
      setAppliedDiscount({ code: "ARTLOVE", percent: 15 });
      addToast("Coupon 'ARTLOVE' applied! 15% discount added. ✨", "success");
    } else {
      addToast("Invalid coupon code. Try 'WHIMSY10' or 'FIRSTART'", "error");
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-10 min-h-[80vh]">
        <div className="section-container">
          {/* Page Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="text-3xl font-bold text-gray-900"
              >
                Your Art Cart
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {items.length} {items.length === 1 ? "unique artwork" : "artworks"} in your collection
              </p>
            </div>

            {items.length > 0 && (
              <button
                onClick={() => {
                  clearCart();
                  addToast("Cart cleared", "info");
                }}
                className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 self-start sm:self-auto"
              >
                <Trash2 size={13} />
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty Cart View */
            <div className="card text-center py-16 px-6 max-w-lg mx-auto bg-white border border-pink-100 shadow-sm rounded-3xl">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🎨
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                Your Cart is Empty
              </h2>
              <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
                Your walls are waiting for something magical. Explore our curated original paintings by independent Indian artists.
              </p>
              <Link href="/shop" className="btn-pill btn-primary text-xs px-7 py-3">
                Discover Artworks
              </Link>
            </div>
          ) : (
            /* Cart Grid with Items + Order Summary */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart Items (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {/* Free Shipping Progress Card */}
                <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <Sparkles size={14} className="text-[#FF69B4]" />
                      {qualifiesForFreeShipping
                        ? "🎉 Congratulations! You unlocked Free Shipping"
                        : `Add ${formatPrice(amountNeededForFreeShipping)} more to unlock FREE Delivery!`}
                    </span>
                    <span className="text-[#FF69B4]">{shippingProgressPct}%</span>
                  </div>
                  <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FFB6C1] to-[#FF69B4] h-full transition-all duration-500"
                      style={{ width: `${shippingProgressPct}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                {items.map(({ product, quantity }) => {
                  const unitPrice = product.salePrice ?? product.price;
                  return (
                    <div
                      key={product.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-pink-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:border-pink-200"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-pink-50 shrink-0 border border-pink-100"
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#FF69B4] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <Link href={`/product/${product.slug}`}>
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base hover:text-[#FF69B4] transition-colors truncate">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">
                          by {product.artist} • {product.size}
                        </p>
                        <p className="text-xs font-semibold text-gray-800 mt-1">
                          {formatPrice(unitPrice)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-pink-200 bg-[#FFF8F5] rounded-full px-3 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="text-gray-600 hover:text-[#FF69B4] px-1 font-bold text-sm"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 font-semibold text-xs text-gray-800">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="text-gray-600 hover:text-[#FF69B4] px-1 font-bold text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right sm:w-28">
                        <span className="font-bold text-sm sm:text-base text-gray-900">
                          {formatPrice(unitPrice * quantity)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          removeItem(product.id);
                          addToast(`Removed "${product.title}" from cart`, "info");
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}

                {/* Back to Shop Link */}
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF69B4] hover:underline pt-2"
                >
                  <ArrowLeft size={14} /> Continue Browsing Artworks
                </Link>
              </div>

              {/* Right Column: Order Summary (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-5">
                {/* Promo Code Input Card */}
                <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Tag size={14} className="text-[#FF69B4]" /> Promo Code
                  </h3>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. WHIMSY10"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#FFF8F5] border border-pink-100 text-xs font-medium uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                    <button
                      type="submit"
                      className="btn-pill btn-primary text-xs px-4 py-2"
                    >
                      Apply
                    </button>
                  </form>
                  {appliedDiscount && (
                    <div className="mt-2.5 text-xs text-emerald-600 font-semibold flex items-center justify-between">
                      <span>✓ {appliedDiscount.code} applied</span>
                      <button
                        onClick={() => setAppliedDiscount(null)}
                        className="text-gray-400 hover:text-gray-600 underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <p className="text-[11px] text-gray-400 mt-2">
                    Try code <strong>WHIMSY10</strong> for 10% off!
                  </p>
                </div>

                {/* Total Summary Breakdown */}
                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-4">
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-lg font-bold text-gray-900 border-b border-pink-100 pb-3"
                  >
                    Order Summary
                  </h3>

                  <div className="flex flex-col gap-2.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Artwork Subtotal</span>
                      <span className="font-semibold text-gray-800">{formatPrice(rawSubtotal)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount ({appliedDiscount?.code})</span>
                        <span>−{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span>Packaging & Delivery</span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-bold uppercase text-[11px]">
                          FREE
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-800">
                          {formatPrice(shippingFee)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-pink-100 pt-3 flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">Total</span>
                      <span className="text-[10px] text-gray-400">All Indian taxes included</span>
                    </div>
                    <span className="text-2xl font-black text-[#D6657E]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>

                  <button
                    onClick={() => router.push("/checkout")}
                    className="btn-pill btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-2 shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>

                  <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-center gap-1.5 text-center">
                    <ShieldCheck size={14} className="text-[#3FA66B]" />
                    <span>Safe & Secure 256-Bit SSL Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
