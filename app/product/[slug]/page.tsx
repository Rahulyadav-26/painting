"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Share2,
  Check,
  Star,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const product = getProductBySlug(resolvedParams.slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);

  if (!product) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FFF5F7]">
          <div className="text-6xl mb-4">🖼️</div>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
          >
            Artwork Not Found
          </h1>
          <p className="text-gray-500 mb-6 max-w-sm">
            This piece may have been acquired by another collector or moved.
          </p>
          <Link href="/shop" className="btn-pill btn-primary text-xs px-6 py-2.5">
            Browse All Paintings
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isWished = has(product.id);
  const related = getRelatedProducts(product, 4);

  const discountPct = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, quantity);
    addToast(`Added ${quantity} × "${product.title}" to your cart! 🎨`, "success");
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addItem(product, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      addToast("Link copied to clipboard! ✨", "info");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-8 sm:py-12">
        <div className="section-container">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#FF69B4] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#FF69B4] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-[#FF69B4] transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>

          {/* Product Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left: Gallery (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? "border-[#FF69B4] scale-95 shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} angle ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Artwork Image Preview */}
              <div className="relative flex-1 aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-lg border border-pink-100">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discountPct && (
                    <span className="bg-[#FF69B4] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {discountPct}% OFF
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#D6657E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      NEW ORIGINAL
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => {
                    toggle(product.id);
                    addToast(
                      isWished ? "Removed from wishlist" : `"${product.title}" saved ♥`,
                      isWished ? "info" : "success"
                    );
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={20}
                    className={
                      isWished
                        ? "text-[#FF69B4] fill-[#FF69B4]"
                        : "text-gray-400 hover:text-[#FF69B4]"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Right: Product Info & Actions (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Category & Artist */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FF69B4] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  {product.category}
                </span>
                <span className="text-xs text-gray-500">
                  Art by{" "}
                  <strong className="text-gray-800 font-semibold">{product.artist}</strong>
                </span>
              </div>

              {/* Title */}
              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
              >
                {product.title}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(product.rating) ? "fill-amber-400" : "opacity-30"}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.reviewCount} collector reviews)
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 py-2 border-y border-pink-100">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-extrabold text-[#D6657E]">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs font-bold text-[#3FA66B] bg-emerald-50 px-2 py-0.5 rounded-full">
                      Save {formatPrice(product.price - product.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-xs text-gray-500 ml-auto">Taxes & Packaging included</span>
              </div>

              {/* Artwork Attributes Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-pink-50">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    Medium
                  </span>
                  <span className="font-semibold text-gray-800">{product.medium}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-pink-50">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    Dimensions
                  </span>
                  <span className="font-semibold text-gray-800">{product.size}</span>
                </div>
              </div>

              {/* Description Snippet */}
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

              {/* Stock status indicator */}
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.inStock ? "bg-emerald-500" : "bg-red-400"
                  }`}
                />
                <span className="font-medium text-gray-700">
                  {product.inStock ? "Available Now — Ready to dispatch" : "Currently Out of Stock"}
                </span>
              </div>

              {/* Quantity & CTA Buttons */}
              {product.inStock && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600">Quantity:</span>
                    <div className="flex items-center border border-pink-200 bg-white rounded-full px-3 py-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-gray-600 hover:text-[#FF69B4] px-1 font-bold text-sm"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold text-xs text-gray-800">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-gray-600 hover:text-[#FF69B4] px-1 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <button
                      onClick={handleAddToCart}
                      className="btn-pill btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="btn-pill bg-[#2B2B2B] text-white hover:bg-black flex-1 py-3 text-sm flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} />
                      Buy Now
                    </button>
                  </div>
                </div>
              )}

              {/* Share button */}
              <button
                onClick={handleShare}
                className="text-xs text-gray-500 hover:text-[#FF69B4] flex items-center gap-1.5 self-start pt-1 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                {copied ? "Link copied!" : "Share this painting"}
              </button>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl p-4 border border-pink-100 flex flex-col gap-2.5 mt-2">
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <Truck size={16} className="text-[#D6657E] shrink-0" />
                  <span>
                    <strong>Free Shipping</strong> on orders above ₹5,000 across India.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <ShieldCheck size={16} className="text-[#3FA66B] shrink-0" />
                  <span>
                    <strong>Signed Certificate of Authenticity</strong> included.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <RotateCcw size={16} className="text-[#4A90D9] shrink-0" />
                  <span>
                    <strong>14-Day Return Guarantee</strong> with full collector refund.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Artwork Specs & Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-pink-100 mb-16">
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-6"
            >
              Artwork Overview & Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2">Original & Archival</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Painted on gallery-grade acid-free archival canvas using lightfast European
                  pigments. Varnished to protect against UV fading, humidity, and dust.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2">Packaging & Delivery</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Carefully wrapped in acid-free glassine paper, heavy-duty bubble lining, and
                  shipped in custom wooden crates for guaranteed safe transit.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2">Direct Artist Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Minted Whimsy directly connects you with <em>{product.artist}</em>. 100% of
                  proceeds support independent craftsmanship and authentic art in India.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {related.length > 0 && (
            <div>
              <div className="text-center mb-8">
                <h2
                  style={{ fontFamily: "var(--font-body)" }}
                  className="text-2xl font-bold text-[#FF69B4]"
                >
                  ✨ You May Also Admire ✨
                </h2>
                <div className="section-dot mt-2" />
                <p className="section-subtitle mt-2">More original works in similar styles</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {related.map((item, idx) => (
                  <ProductCard key={item.id} product={item} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
