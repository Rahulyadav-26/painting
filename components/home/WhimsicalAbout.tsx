"use client";

import Image from "next/image";
import { Heart, Sparkles, Coffee, Feather, Flower2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WhimsicalAbout() {
  const badges = [
    { icon: Flower2, label: "Love for Nature" },
    { icon: Coffee, label: "Cozy Aesthetic" },
    { icon: Feather, label: "Attention to Detail" },
    { icon: Sparkles, label: "Magic in Every Piece" },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 bg-[#FFF9F6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Circular Bunny Frame (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-[#F8D2DB] via-[#FDE8EE] to-[#FFF0F4] shadow-xl border-4 border-white">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src="/images/theme/whimsy-bunny.jpg"
                  alt="Minted Whimsy artist with cozy white bunny and cherry blossoms"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Little Heart */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white text-[#E05D78] shadow-md flex items-center justify-center text-xs">
                ♡
              </div>
            </div>
          </motion.div>

          {/* Right: Bio & Badges (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-7 space-y-5 text-center md:text-left"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE5EB] text-[#C23D5B] text-[11px] font-bold uppercase tracking-widest">
              <Heart size={10} className="fill-[#C23D5B]" />
              ABOUT MINTED WHIMSY ♡
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D272B] tracking-tight">
              Artist. Storyteller. Daydreamer.
            </h2>

            {/* Bio Paragraphs */}
            <p className="text-sm sm:text-base text-[#684B52] leading-relaxed">
              Welcome to Minted Whimsy! We are an illustration and design atelier that loves turning doodles into delightful worlds. Our work is inspired by nature, cozy moments, and the beauty of little details.
            </p>
            <p className="text-sm sm:text-base text-[#684B52] leading-relaxed">
              When we&apos;re not painting, you&apos;ll find us sipping warm tea, curating aesthetic stationery, or collecting vintage trinkets.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {badges.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 rounded-2xl bg-white border border-[#F6DCE2] shadow-xs text-center group hover:border-[#E05D78] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#FDE9EE] text-[#E05D78] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                      <Icon size={16} />
                    </div>
                    <span className="text-[11px] font-bold text-[#4A3237] leading-tight">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
