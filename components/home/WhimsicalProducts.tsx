"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles, BookOpen, FileText, Smile, Palette } from "lucide-react";

export default function WhimsicalProducts() {
  const productCategories = [
    {
      id: "planner",
      title: "Digital Planners",
      badge: "Best Seller",
      categoryName: "Planner",
      desc: "Hourly time-blocking, meal planning, habit trackers & daily wellness templates for GoodNotes & print.",
      price: "From $1",
      image: "/images/products/autumn-daily-planner-aesthetic-flatlay.jpg",
      href: "/product/autumn-harvest-digital-daily-planner",
      icon: BookOpen,
      accentColor: "#F67B92",
      bgGradient: "from-[#FFF2F5] via-[#FFE8ED] to-[#FFDFE6]",
    },
    {
      id: "notes",
      title: "Cozy Note Sheets",
      badge: "Coming Soon",
      categoryName: "Notes",
      desc: "Charming lined, dotted and grid notepad stationery with sweet hand-drawn bunny & blossom margins.",
      price: "From $4",
      image: "/images/products/cozy-whimsical-notes-mockup.jpg",
      href: "/product/cozy-whimsical-digital-note-sheets",
      icon: FileText,
      accentColor: "#9381FF",
      bgGradient: "from-[#F7F5FF] via-[#EFEAFF] to-[#E5DEFF]",
    },
    {
      id: "stickers",
      title: "Whimsical Stickers",
      badge: "Coming Soon",
      categoryName: "Stickers",
      desc: "45+ pre-cropped transparent PNG digital stickers & ready-to-print die-cut watercolor sheets.",
      price: "From $3",
      image: "/images/products/woodland-stickers-mockup.jpg",
      href: "/product/fairytale-woodland-sticker-pack",
      icon: Smile,
      accentColor: "#FF8FAB",
      bgGradient: "from-[#FFF5F8] via-[#FFEDF3] to-[#FFE0EB]",
    },
    {
      id: "coloring-pages",
      title: "Coloring Pages",
      badge: "Coming Soon",
      categoryName: "Coloring pages",
      desc: "Relaxing fairytale forest cottages, floral gardens & friendly woodland animals to color and print.",
      price: "From $4",
      image: "/images/products/fairytale-coloring-pages-mockup.jpg",
      href: "/product/fairytale-forest-printable-coloring-pages",
      icon: Palette,
      accentColor: "#E07A5F",
      bgGradient: "from-[#FFF7F2] via-[#FFEDE2] to-[#FFE3D1]",
    },
  ];

  return (
    <section id="products" className="py-20 sm:py-24 bg-gradient-to-b from-[#FFF9F6] via-[#FFF3F5] to-[#FFF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE5EB] text-[#C23D5B] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Heart size={10} className="fill-[#C23D5B]" />
            OUR PRODUCTS ♡
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D272B] tracking-tight">
            Digital &amp; Printable Goodies ♡
          </h2>
          <p className="text-xs sm:text-sm text-[#7D5B64] mt-2 font-sans">
            Crafted with love to make your everyday journaling, studying, and creative moments magical.
          </p>
        </div>

        {/* 4 Product Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-[#F8DCE2] shadow-sm hover:shadow-xl hover:border-[#F67B92] transition-all duration-300 overflow-hidden"
              >
                {/* Image Showcase */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#FFF5F8]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#3D272B] shadow-xs flex items-center gap-1 border border-pink-100">
                    <Icon size={12} className="text-[#E05D78]" />
                    <span>{p.categoryName}</span>
                  </div>
                  {/* Price Tag Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#3D272B]/85 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md">
                    {p.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C23D5B]">
                        {p.badge}
                      </span>
                      <Sparkles size={12} className="text-[#E05D78]" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#3D272B] group-hover:text-[#E05D78] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#7A5A62] leading-relaxed line-clamp-2">
                      {p.desc}
                    </p>
                  </div>

                  <Link
                    href={p.href}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFF0F4] hover:bg-[#F67B92] text-[#C23D5B] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors duration-200 mt-2"
                  >
                    <span>View Product</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#F67B92] to-[#EE6580] hover:from-[#EE6580] hover:to-[#D9536E] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer"
          >
            <span>EXPLORE ALL PRODUCTS</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
