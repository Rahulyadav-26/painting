"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data/products";

export default function WhimsicalPortfolio() {
  const planner = products[0];

  const galleryItems = [
    {
      title: "Autumn Harvest Daily Planner",
      category: "Digital Printable",
      image: "/images/products/autumn-daily-planner-aesthetic-flatlay.jpg",
      href: "/product/autumn-harvest-digital-daily-planner",
    },
    {
      title: "Fairytale Castle in the Clouds",
      category: "Concept Illustration",
      image: "/images/theme/glimpse-castle.jpg",
      href: "/shop",
    },
    {
      title: "iPad & Tablet Daily Routine",
      category: "Digital GoodNotes Template",
      image: "/images/products/autumn-daily-planner-tablet-stand-mockup.jpg",
      href: "/product/autumn-harvest-digital-daily-planner",
    },
    {
      title: "On-The-Go Pocket Planner",
      category: "Mobile Wallpaper Template",
      image: "/images/products/autumn-daily-planner-phone-mockup.jpg",
      href: "/product/autumn-harvest-digital-daily-planner",
    },
    {
      title: "Whimsical Afternoon at Minted Whimsy",
      category: "Original Atelier Art",
      image: "/images/theme/whimsy-hero.jpg",
      href: "/shop",
    },
    {
      title: "Sweet Cherry Blossom Hugs",
      category: "Storybook Vignette",
      image: "/images/theme/whimsy-bunny.jpg",
      href: "/about",
    },
  ];

  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-[#FFF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and "View All Works" */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE5EB] text-[#C23D5B] text-[11px] font-bold uppercase tracking-widest mb-3">
              <Heart size={10} className="fill-[#C23D5B]" />
              SELECTED WORKS ♡
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D272B] tracking-tight">
              A glimpse into my world ♡
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-[#E05D78] hover:text-[#C23D5B] flex items-center gap-1.5 transition-colors group cursor-pointer"
          >
            <span>VIEW ALL WORKS</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid (6 columns / cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#F8DCE2] shadow-xs hover:shadow-xl hover:border-[#F67B92] transition-all duration-300"
            >
              <Link href={item.href} className="block w-full h-full relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-106"
                />

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                  <p className="text-[10px] text-pink-200 uppercase font-bold tracking-wider">
                    {item.category}
                  </p>
                  <p className="text-xs font-bold leading-snug line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
