"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import type { Product } from "@/types";

interface AllProductsSectionProps {
  onQuickView?: (product: Product) => void;
}

const CATEGORIES = [
  "All Paintings",
  "Floral",
  "Landscape",
  "Abstract",
  "Spiritual",
  "Portrait",
  "Wildlife",
  "Still Life",
];

export default function AllProductsSection({ onQuickView }: AllProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Paintings");

  const filtered = products.filter((p) => {
    if (activeCategory === "All Paintings") return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="all-paintings" className="py-20 sm:py-28 bg-[#FDE2EE]/30 border-t border-[#FFD6E5]">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-[#FF7096] uppercase tracking-widest bg-white border border-[#FFD6E5] px-4 py-1.5 rounded-full mb-3 inline-block shadow-xs">
            Complete Archive
          </span>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-5xl font-bold text-[#2B2329] tracking-tight mt-2 mb-3"
          >
            The Collector&apos;s Archive
          </h2>
          <div className="blushy-divider">
            <div className="blushy-divider-line" />
            <div className="blushy-divider-dot" />
            <div className="blushy-divider-line" />
          </div>
          <p className="blushy-section-subtitle max-w-lg mx-auto">
            Explore authentic original canvases created by India&apos;s independent fine artists
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                activeCategory === cat
                  ? "bg-[#2B2329] text-white"
                  : "bg-white text-gray-700 border border-[#FFD6E5] hover:border-[#FF7096] hover:bg-[#FDE2EE]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Paintings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
