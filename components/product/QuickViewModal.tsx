"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingCart, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);

  if (!product) return null;

  const isWished = has(product.id);
  const discountPct = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product);
    addToast(`"${product.title}" added to cart! 🎨`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-pink-100 shadow-2xl z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-gray-500 hover:text-[#FF7096] flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FDE2EE] border border-pink-100">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="320px"
            />
            {product.isComingSoon ? (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-[#FF7096] to-[#E05D78] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow-md flex items-center gap-1">
                <Sparkles size={11} className="text-yellow-200" />
                Coming Soon
              </span>
            ) : discountPct ? (
              <span className="absolute top-3 left-3 bg-[#FF5722] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                {discountPct}% OFF
              </span>
            ) : null}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2.5 text-xs text-gray-600">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF7096] bg-pink-50 px-2.5 py-0.5 rounded-full self-start">
              {product.category}
            </span>

            <h2
              style={{ fontFamily: "var(--font-body)" }}
              className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug"
            >
              {product.title}
            </h2>

            <p className="text-gray-500">
              Art by <strong>{product.artist}</strong> • {product.size}
            </p>

            <div className="flex items-baseline gap-2 py-1">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-black text-[#FF7096]">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-black text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  product.isComingSoon
                    ? "bg-[#FF7096] animate-pulse"
                    : product.inStock
                    ? "bg-[#10B981]"
                    : "bg-gray-400"
                }`}
              />
              <span
                className={`text-[11px] font-semibold ${
                  product.isComingSoon
                    ? "text-[#FF7096]"
                    : product.inStock
                    ? "text-[#10B981]"
                    : "text-gray-400"
                }`}
              >
                {product.isComingSoon
                  ? "Coming Soon — In Creation ✨"
                  : product.inStock
                  ? "In Stock — Ready to ship"
                  : "Sold Out"}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-3">
              {product.isComingSoon ? (
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FFF0F4] to-[#FFE4EC] hover:from-[#FFE4EC] hover:to-[#FFD6E5] text-[#C23D5B] border border-[#F8BBD0] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Sparkles size={13} className="text-[#E05D78]" />
                  <span>Coming Soon • View Details</span>
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-pill btn-primary flex-1 py-2.5 text-xs flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              )}

              <button
                onClick={() => {
                  toggle(product.id);
                  addToast(
                    isWished ? "Removed from wishlist" : `"${product.title}" saved ♥`,
                    isWished ? "info" : "success"
                  );
                }}
                className="w-10 h-10 rounded-full border border-pink-200 flex items-center justify-center hover:bg-pink-50 transition-colors"
                aria-label="Wishlist"
              >
                <Heart
                  size={16}
                  className={
                    isWished
                      ? "text-[#FF7096] fill-[#FF7096]"
                      : "text-gray-400 hover:text-[#FF7096]"
                  }
                />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-center text-[11px] text-[#FF7096] font-semibold hover:underline pt-1"
            >
              View Full Artwork Specs & Provenance →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
