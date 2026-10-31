"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import type { ProductCategory, ProductMedium } from "@/types";

const ALL_CATEGORIES: (ProductCategory | "All")[] = [
  "All",
  "Daily Planner",
  "Notes",
  "Stickers",
  "Coloring pages",
];

const ALL_MEDIUMS: (ProductMedium | "All")[] = [
  "All",
  "Digital Printable / Tablet PDF",
];

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSaleOnly = searchParams.get("sale") === "true";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMedium, setSelectedMedium] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [saleOnly, setSaleOnly] = useState<boolean>(initialSaleOnly);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    if (searchParams.get("sale") === "true") setSaleOnly(true);
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
    const minP = searchParams.get("minPrice");
    const maxP = searchParams.get("maxPrice");
    if (minP || maxP) {
      setPriceRange({
        min: minP ? parseInt(minP, 10) : undefined,
        max: maxP ? parseInt(maxP, 10) : undefined,
      });
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const effectivePrice = p.salePrice ?? p.price;
        if (priceRange.min !== undefined && effectivePrice < priceRange.min) return false;
        if (priceRange.max !== undefined && effectivePrice > priceRange.max) return false;
        if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
        if (selectedMedium !== "All" && p.medium !== selectedMedium) return false;
        if (inStockOnly && !p.inStock) return false;
        if (saleOnly && !p.salePrice) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchArtist = p.artist.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchMedium = p.medium.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchArtist && !matchCategory && !matchMedium && !matchTag) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [selectedCategory, selectedMedium, inStockOnly, saleOnly, searchQuery, sortBy, priceRange]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedMedium("All");
    setSearchQuery("");
    setInStockOnly(false);
    setSaleOnly(false);
    setPriceRange({});
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedMedium !== "All" ||
    searchQuery.trim() !== "" ||
    inStockOnly ||
    saleOnly ||
    priceRange.min !== undefined ||
    priceRange.max !== undefined ||
    sortBy !== "featured";

  return (
    <div className="py-10 bg-[#FFF5F7] min-h-[80vh]">
      <div className="section-container">
        {/* Header Title */}
        <div className="text-center mb-8">
          <h1
            style={{ fontFamily: "var(--font-body)" }}
            className="text-3xl sm:text-4xl font-bold text-[#E05D78] flex items-center justify-center gap-2"
          >
            ✨ Whimsical Atelier Shop
          </h1>
          <div className="section-dot mt-2" />
          <p className="section-subtitle mt-2 max-w-lg mx-auto">
            Explore our collection of digital daily planners, cozy note sheets, sticker packs, and printable coloring pages created with love.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-pink-100 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, artist, style, or tag..."
              className="w-full pl-11 pr-10 py-2.5 rounded-full bg-[#FFF8F5] border border-pink-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Controls: Stock toggle, Sale toggle, Sort dropdown */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setSaleOnly((v) => !v)}
              className={`btn-pill text-xs px-3.5 py-2 ${
                saleOnly
                  ? "bg-[#FF69B4] text-white"
                  : "bg-[#FFF8F5] text-gray-700 border border-pink-100 hover:bg-pink-50"
              }`}
            >
              🔥 On Sale
            </button>

            <button
              onClick={() => setInStockOnly((v) => !v)}
              className={`btn-pill text-xs px-3.5 py-2 ${
                inStockOnly
                  ? "bg-[#3FA66B] text-white"
                  : "bg-[#FFF8F5] text-gray-700 border border-pink-100 hover:bg-pink-50"
              }`}
            >
              🌿 In Stock
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-[#FFF8F5] border border-pink-100 rounded-full px-3 py-1.5">
              <ArrowUpDown size={14} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter toggle */}
            <button
              onClick={() => setMobileFilterOpen((v) => !v)}
              className="md:hidden flex items-center gap-1.5 bg-[#FFF8F5] border border-pink-100 rounded-full px-3.5 py-2 text-xs font-semibold text-[#FF69B4]"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF69B4] text-white shadow-sm"
                  : "bg-white text-gray-700 border border-pink-100 hover:bg-pink-50"
              }`}
            >
              {cat === "All" ? "✨ All Works" : cat}
            </button>
          ))}
        </div>

        {/* Medium Chips - Desktop & Mobile collapsible */}
        <div className={`mb-8 ${mobileFilterOpen ? "block" : "hidden md:block"}`}>
          <div className="flex items-center gap-2 flex-wrap bg-white/70 p-3 rounded-2xl border border-pink-50">
            <span className="text-xs font-semibold text-gray-500 pl-2">Medium:</span>
            {ALL_MEDIUMS.map((med) => (
              <button
                key={med}
                onClick={() => setSelectedMedium(med)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  selectedMedium === med
                    ? "bg-[#D6657E] text-white"
                    : "bg-white text-gray-600 border border-pink-100 hover:bg-pink-50"
                }`}
              >
                {med}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-[#FF69B4] font-medium hover:underline flex items-center gap-1 px-2"
              >
                <X size={12} /> Clear all
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-medium text-gray-500">
            Showing <span className="font-bold text-[#FF69B4]">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "artwork" : "artworks"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#FF69B4] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="card text-center py-16 px-6 max-w-md mx-auto my-8">
            <div className="text-5xl mb-4">🔍</div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl font-bold text-gray-800 mb-2"
            >
              No Artworks Found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              We couldn't find any paintings matching your selected filters or search terms.
            </p>
            <button
              onClick={resetFilters}
              className="btn-pill btn-primary text-xs px-6 py-2.5 mx-auto"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF69B4]" />
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </MainLayout>
  );
}
