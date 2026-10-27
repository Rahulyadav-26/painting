"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Gem, Crown, Award } from "lucide-react";

const collectorTiers = [
  {
    title: "Under ₹5,000",
    name: "Intimate Studies",
    desc: "Petite gouache and archival watercolor studies ideal for curated gallery walls.",
    href: "/shop?maxPrice=5000",
    icon: Compass,
    iconColor: "#4A90D9",
    iconBg: "#EFF6FF",
    artworksCount: "8 Artworks",
  },
  {
    title: "₹5,000 – ₹10,000",
    name: "Accent Canvases",
    desc: "Medium original florals and serene landscapes to infuse warmth into entryways.",
    href: "/shop?minPrice=5000&maxPrice=10000",
    icon: Gem,
    iconColor: "#10B981",
    iconBg: "#ECFDF5",
    artworksCount: "12 Artworks",
  },
  {
    title: "₹10,000 – ₹20,000",
    name: "Signature Works",
    desc: "Prominent textured oils and fluid acrylics that anchor modern living spaces.",
    href: "/shop?minPrice=10000&maxPrice=20000",
    icon: Award,
    iconColor: "#FF7096",
    iconBg: "#FDE2EE",
    artworksCount: "10 Artworks",
  },
  {
    title: "₹20,000 & Above",
    name: "Masterpiece Works",
    desc: "Heirloom large-format statement canvases with 24k gold leaf and museum provenance.",
    href: "/shop?minPrice=20000",
    icon: Crown,
    iconColor: "#D97706",
    iconBg: "#FEF3C7",
    artworksCount: "5 Artworks",
  },
];

export default function ShopByPrice() {
  return (
    <section className="py-20 sm:py-28 bg-[#FFF8FA] border-t border-[#FFD6E5]">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold text-[#FF7096] uppercase tracking-widest bg-white border border-[#FFD6E5] px-4 py-1.5 rounded-full mb-3 inline-block shadow-xs">
            Art Advisory
          </span>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-5xl font-bold text-[#2B2329] tracking-tight mt-2 mb-3"
          >
            Acquire by Collector Tier
          </h2>
          <div className="blushy-divider">
            <div className="blushy-divider-line" />
            <div className="blushy-divider-dot" />
            <div className="blushy-divider-line" />
          </div>
          <p className="blushy-section-subtitle max-w-lg mx-auto">
            Thoughtfully curated pricing tiers designed for emerging and seasoned art collectors alike
          </p>
        </motion.div>

        {/* 4 Collector Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectorTiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="card blushy-card p-7 flex flex-col h-full rounded-3xl bg-white border-[1.5px] border-[#FFD6E5] hover:border-[#FF7096] hover:shadow-xl transition-all duration-300">
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                      style={{ background: tier.iconBg }}
                    >
                      <Icon size={22} style={{ color: tier.iconColor }} strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {tier.artworksCount}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#FF7096] tracking-wide uppercase mb-1">
                    {tier.title}
                  </p>

                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-xl font-bold text-[#2B2B2B] mb-2"
                  >
                    {tier.name}
                  </h3>

                  <p className="text-xs text-[#8A7D7D] leading-relaxed mb-6 flex-1">
                    {tier.desc}
                  </p>

                  <Link
                    href={tier.href}
                    className="btn-pill btn-primary w-full text-xs py-2.5 justify-center shadow-xs uppercase tracking-wider font-bold inline-flex items-center gap-1.5"
                  >
                    <span>View Artworks</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
