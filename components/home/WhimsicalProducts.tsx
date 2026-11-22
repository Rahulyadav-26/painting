"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

const CATEGORY_TABS = [
  { id: "All", label: "All Products", title: "All Products", subtitle: "Explore our whimsical art & stationery collection ✨" },
  { id: "Stickers", label: "Stickers", title: "Stickers", subtitle: "Our cutest picks, just for you 💕" },
  { id: "Daily Planner", label: "Planner", title: "Daily Planners", subtitle: "Organize your days with warmth & intention 🗓️" },
  { id: "Coloring pages", label: "Colouring Pages", title: "Colouring Pages", subtitle: "Relaxing storybook illustrations to bring to life 🎨" },
  { id: "Notes", label: "Cozy Notes", title: "Cozy Notes", subtitle: "Charming note pages for sweet thoughts & journaling 📝" },
];

export default function WhimsicalProducts() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const currentTab = CATEGORY_TABS.find((t) => t.id === activeCategory) || CATEGORY_TABS[0];

  const displayedProducts = products.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="products" className="py-14 sm:py-20 bg-[#FAF9F5] text-[#221F20] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title & Subtitle — Matching Screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1E1B1D]">
            {currentTab.title}
          </h2>
          <p className="text-sm sm:text-base text-[#575153] mt-2 font-normal">
            {currentTab.subtitle}
          </p>
        </div>

        {/* Horizontal Category Pill Filter Tabs — Matching Ordered Format */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 px-1">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`shrink-0 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#F67B92] to-[#E05D78] text-white shadow-xs"
                    : "bg-white text-[#4A4547] border border-[#EBE8E3] hover:border-[#F67B92] hover:text-[#E05D78]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4-Column Product Grid — Matching Screenshot */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {displayedProducts.map((prod, idx) => (
              <ProductCard key={prod.id} product={prod} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Link to Shop */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 py-3 px-7 rounded-xl bg-white border border-[#DCD7D0] hover:border-[#F67B92] text-[#2D2A2B] hover:text-[#E05D78] font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            <span>View All Atelier Goods</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
