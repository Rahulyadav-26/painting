"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Sparkles } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { ids, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
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

  const wishedProducts = products.filter((p) => ids.includes(p.id));

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-10 min-h-[80vh]">
        <div className="section-container">
          <div className="text-center mb-10">
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2"
            >
              ♥ Your Saved Artworks
            </h1>
            <div className="section-dot mt-2" />
            <p className="section-subtitle mt-2">
              Keep track of pieces you love or save them for your next home gallery refresh.
            </p>
          </div>

          {wishedProducts.length === 0 ? (
            <div className="card text-center py-16 px-6 max-w-md mx-auto bg-white border border-pink-100 shadow-sm rounded-3xl">
              <div className="text-5xl mb-4">🤍</div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl font-bold text-gray-800 mb-2"
              >
                No Saved Artworks Yet
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Tap the heart on any artwork to save it to your wishlist and revisit it anytime.
              </p>
              <Link href="/shop" className="btn-pill btn-primary text-xs px-7 py-3">
                Explore Artworks
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishedProducts.map((product) => {
                const price = product.salePrice ?? product.price;
                return (
                  <div
                    key={product.id}
                    className="card bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm flex flex-col transition-all hover:shadow-md"
                  >
                    <div className="relative aspect-square overflow-hidden bg-pink-50">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <button
                        onClick={() => {
                          toggle(product.id);
                          addToast(`Removed "${product.title}" from saved pieces`, "info");
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-red-500 hover:scale-110 transition-transform"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <span className="text-[10px] font-bold text-[#FF69B4] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 text-sm hover:text-[#FF69B4] transition-colors truncate">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500">
                        by {product.artist} • {product.size}
                      </p>

                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900">{formatPrice(price)}</span>

                        <button
                          onClick={() => {
                            if (!product.inStock) return;
                            addItem(product);
                            addToast(`"${product.title}" added to cart! 🎨`, "success");
                          }}
                          disabled={!product.inStock}
                          className="btn-pill btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
                        >
                          <ShoppingCart size={12} />
                          {product.inStock ? "Add to Cart" : "Sold Out"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
