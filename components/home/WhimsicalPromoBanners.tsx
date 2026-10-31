"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function WhimsicalPromoBanners() {
  return (
    <section className="py-12 bg-[#FFF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Promo Card: Shop Planners & Stationery */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF0F4] via-[#FDE8EF] to-[#FCE2EB] border border-[#F8D2DC] shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-bold text-[#C23D5B] uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-pink-200 inline-block">
                SHOP ALL CREATIONS ♡
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#3D272B]">
                Planners, stickers &amp; more
              </h3>
              <p className="text-xs text-[#6E4E56] leading-relaxed max-w-sm">
                Bring a little magic home with digital daily planners, aesthetic note sheets, printable stickers, and relaxing coloring pages!
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#E05D78] hover:bg-[#C23D5B] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer"
              >
                <span>VISIT THE SHOP</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Decorative background emoji */}
            <div className="absolute right-4 bottom-4 text-6xl opacity-20 pointer-events-none select-none">
              🎀
            </div>
          </motion.div>

          {/* Right Promo Card: Instant Digital Delivery */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF5F0] via-[#FDEFE8] to-[#FCE7DC] border border-[#F8DAC9] shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-bold text-[#B95D28] uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-amber-200 inline-block">
                INSTANT ACCESS ♡
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#3D272B]">
                Immediate digital downloads
              </h3>
              <p className="text-xs text-[#6E4E56] leading-relaxed max-w-sm">
                Every digital file is watermark-free, tablet-compatible with GoodNotes and Notability, and delivered straight to your email.
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#D46B34] hover:bg-[#B95520] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer"
              >
                <span>EXPLORE DIGITAL GOODIES</span>
                <Download size={14} />
              </Link>
            </div>

            {/* Decorative background emoji */}
            <div className="absolute right-4 bottom-4 text-6xl opacity-20 pointer-events-none select-none">
              ✨
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
