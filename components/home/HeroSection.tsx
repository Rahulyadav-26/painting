"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Award, Palette, Eye } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#241F22]">
      {/* Background Image: High-end architectural gallery living room with large oil painting */}
      <div className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center">
        <Image
          src="/images/hero-gallery.jpg"
          alt="Original Fine Art Paintings — Minted Whimsy Art Gallery"
          fill
          priority
          className="object-cover object-center brightness-[0.88] contrast-[1.02]"
          sizes="100vw"
        />

        {/* Sophisticated Luxury Multi-stop Gradient Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(20, 16, 20, 0.25) 0%, rgba(25, 20, 24, 0.65) 60%, rgba(18, 14, 18, 0.88) 100%), linear-gradient(180deg, rgba(30, 22, 28, 0.5) 0%, transparent 40%, rgba(20, 15, 18, 0.95) 100%)",
          }}
        />

        {/* Ambient Warm Golden Rim Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#E0659B]/15 blur-[120px] pointer-events-none" />

        {/* Hero Content Container */}
        <div className="container relative z-10 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Column: Editorial Headline & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 flex flex-col items-start text-left"
            >
              {/* Prestige Curated Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-widest uppercase mb-6 shadow-sm">
                <Sparkles size={13} className="text-[#FFA0B4]" />
                <span>Original Indian Fine Art & Hand-Painted Canvases</span>
              </div>

              {/* Majestic Serif Headline */}
              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
              >
                Where Rare Artistry <br />
                <span className="italic font-normal text-[#FFD6E5]">
                  Meets Whimsical Living
                </span>
              </h1>

              {/* Subheading with editorial depth */}
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mb-8 font-light">
                Discover one-of-a-one original oil, watercolour, and textured acrylic paintings
                created by India&apos;s most promising independent artists. Hand-varnished, wax-sealed,
                and delivered in custom museum transit crates.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link
                  href="/shop"
                  className="btn-pill px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2.5"
                  style={{
                    background: "linear-gradient(135deg, #FFA0B4 0%, #FF7096 100%)",
                    color: "#FFFFFF",
                  }}
                >
                  Explore The Collection
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/about"
                  className="btn-pill px-7 py-3.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  Meet Resident Artists
                </Link>
              </div>

              {/* Gallery Trust Stats Bar */}
              <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-2xl">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                    100%
                  </p>
                  <p className="text-[11px] text-white/70 uppercase tracking-wider font-medium mt-0.5">
                    Original Canvases
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                    18+
                  </p>
                  <p className="text-[11px] text-white/70 uppercase tracking-wider font-medium mt-0.5">
                    Master Painters
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                    ₹0
                  </p>
                  <p className="text-[11px] text-white/70 uppercase tracking-wider font-medium mt-0.5">
                    Gallery Markups
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                    4.9★
                  </p>
                  <p className="text-[11px] text-white/70 uppercase tracking-wider font-medium mt-0.5">
                    Collector Rating
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Floating Curated Masterpiece Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 flex justify-end"
            >
              <div className="w-full max-w-sm rounded-3xl bg-white/15 backdrop-blur-xl border border-white/30 p-5 shadow-2xl text-white">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD6E5] bg-white/10 px-2.5 py-1 rounded-full">
                    Featured Masterpiece
                  </span>
                  <span className="text-[10px] font-semibold text-white/70">
                    1 of 1 Unique Work
                  </span>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3.5 border border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop"
                    alt="Blushing Peonies by Priya Nair"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="340px"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white font-medium">
                    Oil on Belgian Linen
                  </div>
                </div>

                <div>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-lg font-bold text-white mb-0.5"
                  >
                    Blushing Peonies
                  </h3>
                  <p className="text-xs text-[#FFD6E5] font-medium mb-3">
                    by Priya Nair • Kochi, Kerala
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/15">
                    <div>
                      <p className="text-[10px] text-white/60 uppercase">Collector Price</p>
                      <p className="text-base font-bold text-white">₹8,500</p>
                    </div>
                    <Link
                      href="/product/blushing-peonies"
                      className="px-4 py-2 rounded-full bg-white text-[#2B2329] hover:bg-[#FFD6E5] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Eye size={12} />
                      View Piece
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust & Provenance Ribbon Below Hero */}
      <div className="border-t border-b border-white/10 bg-[#1A1618] py-4 text-white">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#FFA0B4]">
                <Palette size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">100% Artist Direct</p>
                <p className="text-[10px] text-white/60">Fair living artist royalties</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                <Award size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Wax-Sealed Certificate</p>
                <p className="text-[10px] text-white/60">Signed provenance included</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-sky-400">
                <ShieldCheck size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Crated Art Transit</p>
                <p className="text-[10px] text-white/60">Insured damage-free delivery</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                <Sparkles size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">14-Day In-Home Trial</p>
                <p className="text-[10px] text-white/60">Live with art before deciding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
