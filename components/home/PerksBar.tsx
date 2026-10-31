"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Palette, RefreshCw } from "lucide-react";

const perks = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders above $35.",
    color: "#D6657E",
    bg: "#FFE3DC",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    description: "Every piece comes with a signed certificate of authenticity.",
    color: "#3FA66B",
    bg: "#F0FBF5",
  },
  {
    icon: Palette,
    title: "Artist-Direct",
    description: "100% of proceeds go directly to the artist.",
    color: "#4A90D9",
    bg: "#EFF6FF",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Not in love with your piece? Return within 14 days.",
    color: "#F5A623",
    bg: "#FFFBEB",
  },
];

export default function PerksBar() {
  return (
    <section className="py-14 bg-white border-y border-[#FFE3DC]">
      <div className="section-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((perk, i) => {
          const Icon = perk.icon;
          return (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-start gap-4"
            >
              <div
                className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: perk.bg }}
              >
                <Icon size={22} style={{ color: perk.color }} strokeWidth={1.8} />
              </div>
              <div>
                <h4
                  style={{ fontFamily: "var(--font-display)" }}
                  className="font-semibold text-[#2B2B2B] text-sm mb-1"
                >
                  {perk.title}
                </h4>
                <p className="text-xs text-[#7A6F6F] leading-relaxed">
                  {perk.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
