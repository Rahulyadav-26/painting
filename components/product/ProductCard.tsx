"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock || product.isComingSoon) return;
    addItem(product);
    addToast(`"${product.title}" added to cart! 💕`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="h-full"
    >
      <div className="group flex flex-col justify-between h-full bg-white rounded-2xl p-2.5 sm:p-3 border border-[#EBE8E3] shadow-xs hover:shadow-md transition-all duration-300">
        <Link href={`/product/${product.slug}`} className="block flex-1 flex flex-col">
          {/* Image Container — Square & Clean like Moonie Loops */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F6F5F2] border border-[#F0ECE6]">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-103"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />

            {/* Badge on Top-Left: Bestseller or Coming Soon */}
            {product.isComingSoon ? (
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-gray-100 text-gray-700 shadow-2xs">
                Coming Soon
              </span>
            ) : (
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#FFE6EC] text-[#D6336C] shadow-2xs">
                Bestseller
              </span>
            )}

            {/* Wishlist Heart Button on Top-Right */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleWishlist}
              type="button"
              aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-xs flex items-center justify-center transition-all duration-150 border border-white hover:border-pink-200"
            >
              <Heart
                size={14}
                className={
                  isWished
                    ? "text-[#E05D78] fill-[#E05D78]"
                    : "text-gray-400 hover:text-[#E05D78]"
                }
              />
            </motion.button>

            {/* Optional Quick View on Hover */}
            {onQuickView && (
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                  className="pointer-events-auto bg-white/90 backdrop-blur-xs text-xs font-semibold px-3 py-1.5 rounded-full text-gray-800 shadow-md hover:bg-white flex items-center gap-1.5"
                >
                  <Eye size={12} />
                  <span>Quick View</span>
                </button>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="pt-2.5 pb-1 flex flex-col flex-1">
            <h3 className="font-semibold text-xs sm:text-sm text-[#221F20] line-clamp-1 group-hover:text-[#E05D78] transition-colors leading-snug">
              {product.title}
            </h3>

            <div className="mt-1 mb-2.5 flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[#1C181A]">
                {formatPrice(product.salePrice ?? product.price, product.currency)}
              </span>
              {product.salePrice && product.salePrice < product.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Action Button: [ 🛒 Add to Cart ] full-width in website theme */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock || product.isComingSoon}
          className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F67B92] to-[#E05D78] hover:from-[#EE6580] hover:to-[#C23D5B] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={15} />
          <span>
            {product.isComingSoon
              ? "Coming Soon"
              : product.inStock
              ? "Add to Cart"
              : "Sold Out"}
          </span>
        </button>
      </div>
    </motion.article>
  );
}
