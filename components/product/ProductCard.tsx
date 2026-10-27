"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);
  const isWished = has(product.id);

  /* Discount % */
  const discountPct = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    addToast(`"${product.title}" added to your collection! 🎨`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    addToast(
      isWished ? "Removed from wishlist" : `"${product.title}" saved to your wishlist ♥`,
      isWished ? "info" : "success"
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <div className="card group flex flex-col h-full bg-white rounded-3xl p-3.5 border-[1.5px] border-[#FFD6E5] shadow-xs hover:shadow-xl hover:border-[#FFB6C1] transition-all duration-300">
        <Link href={`/product/${product.slug}`} className="block flex-1 flex flex-col">
          {/* ── Image & Frame Wrapper ── */}
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#FDF5F8] mb-3.5 border border-pink-100/60">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />

            {/* Subtle Canvas Grain / Ambient Frame Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* 1 of 1 Original Provenance Badge (Top-left) */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#2B2329] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm z-10 uppercase tracking-wider border border-[#FFD6E5]">
              <Sparkles size={10} className="text-[#FF7096]" />
              <span>Original 1 of 1</span>
            </div>

            {/* Sale Ribbon Tag if applicable */}
            {discountPct && (
              <div className="absolute bottom-2.5 left-2.5 bg-[#FF5722] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm z-10 uppercase tracking-wider">
                {discountPct}% OFF
              </div>
            )}

            {/* Wishlist Heart Circle (Top-right) */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleWishlist}
              aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md shadow-sm flex items-center justify-center transition-all duration-200 z-10 border border-[#FFD6E5] hover:border-[#FF7096]"
            >
              <Heart
                size={14}
                className={
                  isWished
                    ? "text-[#FF7096] fill-[#FF7096]"
                    : "text-gray-400 hover:text-[#FF7096]"
                }
              />
            </motion.button>

            {/* Hover Quick View Button */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onQuickView) onQuickView(product);
                  else window.location.href = `/product/${product.slug}`;
                }}
                className="btn-pill bg-white text-[#2B2329] hover:bg-[#FDE2EE] text-[11px] font-bold px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5"
              >
                <Eye size={12} className="text-[#FF7096]" />
                Inspect Canvas
              </button>
            </div>

            {/* Sold Out Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] z-10">
                <span className="text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 text-white bg-[#C2185B] shadow-md">
                  Acquired / Sold
                </span>
              </div>
            )}
          </div>

          {/* ── Artwork Metadata Content ── */}
          <div className="flex flex-col flex-1 text-left px-1">
            {/* Artist & Medium Line */}
            <p className="text-[11px] text-[#FF7096] font-semibold tracking-wide uppercase line-clamp-1 mb-1">
              {product.artist}
            </p>

            {/* Painting Title */}
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-base font-bold text-[#2B2B2B] leading-snug line-clamp-1 group-hover:text-[#FF7096] transition-colors mb-1"
              title={product.title}
            >
              {product.title}
            </h3>

            {/* Medium & Dimensions */}
            <p className="text-xs text-[#8A7D7D] font-normal line-clamp-1 mb-2.5">
              {product.medium} • {product.size}
            </p>

            {/* Price & Authenticity Row */}
            <div className="mt-auto pt-2 border-t border-pink-100 flex items-center justify-between">
              <div>
                {product.salePrice ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#2B2B2B]">
                      {formatPrice(product.salePrice)}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base font-bold text-[#2B2B2B]">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Certified
              </span>
            </div>
          </div>
        </Link>

        {/* Add to Collection Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label={`Add ${product.title} to cart`}
          className="btn-pill btn-primary w-full mt-3 text-xs py-2.5 justify-center shadow-xs uppercase tracking-wider font-bold"
          style={{
            opacity: product.inStock ? 1 : 0.5,
            cursor: product.inStock ? "pointer" : "not-allowed",
          }}
        >
          <ShoppingBag size={13} />
          {product.inStock ? "Acquire Painting" : "Sold Out"}
        </motion.button>
      </div>
    </motion.article>
  );
}
