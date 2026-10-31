"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  onQuickView?: (product: Product) => void;
}

const FILTER_TABS = ["All Curations", "Daily Planner", "Floral", "Landscape", "Abstract", "Spiritual"];

export default function FeaturedProducts({ onQuickView }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState("All Curations");

  const filtered = products.filter((p) => {
    if (activeTab === "All Curations") return true;
    return p.category.toLowerCase() === activeTab.toLowerCase();
  }).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#FFF8FA]">
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
            Exclusively Curated
          </span>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-5xl font-bold text-[#2B2329] tracking-tight mt-2 mb-3"
          >
            Curated New Acquisitions
          </h2>
          <div className="blushy-divider">
            <div className="blushy-divider-line" />
            <div className="blushy-divider-dot" />
            <div className="blushy-divider-line" />
          </div>
          <p className="blushy-section-subtitle max-w-lg mx-auto">
            Hand-varnished original canvases freshly completed and released for art collectors
          </p>

          {/* Curated Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab
                    ? "bg-[#2B2329] text-white shadow-md"
                    : "bg-white text-gray-700 border border-[#FFD6E5] hover:border-[#FF7096] hover:bg-[#FDE2EE]/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4 Product Cards Grid */}
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

        {/* View All Products Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            href="/shop"
            className="btn-pill btn-primary px-9 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Explore Complete Archive ({products.length} Paintings)
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
