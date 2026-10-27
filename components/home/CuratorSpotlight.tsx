"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function CuratorSpotlight() {
  return (
    <section className="py-20 sm:py-28 bg-[#FFF8FA] overflow-hidden border-t border-[#FFD6E5]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Art Craftsmanship Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Atelier Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/studio-craft.jpg"
                alt="Artist Atelier Craftsmanship — Pure mineral pigments and Belgian linen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#2B2329]">Original Impasto & 24k Gold Leaf</p>
                    <p className="text-[11px] text-[#A87B8A]">Hand-stretched 400gsm Belgian linen canvas</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#FF7096] bg-[#FDE2EE] px-3 py-1 rounded-full">
                    Archival Quality
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Floating Accent Badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-2.5 bg-white rounded-2xl p-4 shadow-xl border border-pink-100">
              <div className="w-10 h-10 rounded-xl bg-[#FDE2EE] flex items-center justify-center text-[#FF7096]">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2B2B2B]">100% Hand-Painted</p>
                <p className="text-[10px] text-gray-500">Zero digital prints</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Curator Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-xs font-bold text-[#FF7096] uppercase tracking-widest bg-white border border-[#FFD6E5] px-4 py-1.5 rounded-full mb-4 shadow-xs">
              Curator&apos;s Atelier
            </span>

            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2329] leading-tight mb-6"
            >
              The Unhurried Devotion of Original Fine Art
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-normal">
              Every canvas represented by Minted Whimsy begins with weeks of silent intuition.
              Our resident artists mix rich raw mineral pigments with natural walnut and linseed
              oils, applying textured brushstrokes and genuine gold-leaf accents by hand.
            </p>

            {/* Key Value Points */}
            <div className="space-y-4 mb-8 w-full">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2B2329]">Luminous Lightfast Pigments</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    European-grade archival pigments formulated to preserve optical brilliance for generations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2B2329]">Wax-Sealed Provenance Certificate</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Every piece arrives with an official certificate of authenticity hand-signed by the painter.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#2B2329]">Custom Wood Shock-Resistant Crating</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Engineered protective art crates with moisture shields ensure your investment arrives in immaculate condition.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="btn-pill btn-primary text-xs font-bold uppercase tracking-wider px-8 py-3.5 shadow-md hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Discover Our Collective Story
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
