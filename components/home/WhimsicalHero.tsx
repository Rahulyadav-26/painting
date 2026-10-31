"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export default function WhimsicalHero() {
  return (
    <section className="relative pt-10 sm:pt-16 pb-20 bg-gradient-to-b from-[#FDE8EE] via-[#FCE4EC] to-[#FDE8EF] overflow-hidden">
      {/* Delicate floating watercolor petals & stars */}
      <div className="absolute top-12 left-10 text-pink-300/60 select-none pointer-events-none text-2xl animate-pulse">
        🌸
      </div>
      <div className="absolute top-28 right-16 text-pink-300/50 select-none pointer-events-none text-xl">
        ✨
      </div>
      <div className="absolute bottom-24 left-1/4 text-pink-300/40 select-none pointer-events-none text-lg">
        🌿
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Whimsical Hello Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#F8C8D4] text-[#E05D78] text-xs font-bold uppercase tracking-widest shadow-xs">
              <Heart size={12} className="fill-[#E05D78] text-[#E05D78]" />
              WELCOME TO MINTED WHIMSY ♡
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#3D272B] tracking-tight leading-[1.12]">
              Whimsical art <br className="hidden sm:inline" />
              for dreamers <br className="hidden sm:inline" />
              <span className="text-[#E05D78] font-serif italic">&amp; kind hearts</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6D4C53] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              I create charming illustrations and heartfelt visual stories that spark imagination and bring a little magic to everyday life.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#F67B92] to-[#EE6580] hover:from-[#EE6580] hover:to-[#D9536E] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-300/40 hover:shadow-xl hover:scale-102 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#products"
                className="py-3.5 px-6 rounded-full bg-white/90 border border-[#F6C2CE] text-[#5C3D44] hover:bg-white hover:border-[#E05D78] font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
              >
                <span>OUR PRODUCTS</span>
                <Sparkles size={14} className="text-[#E05D78]" />
              </Link>
            </div>
          </motion.div>

          {/* Right Illustration Column (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white/60 p-2.5 border-2 border-white/80 group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#FFF5F7]">
                <Image
                  src="/images/theme/whimsy-hero.jpg"
                  alt="Minted Whimsy - Whimsical Illustration Atelier"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  priority
                />
              </div>

              {/* Floating Artist Signature Badge */}
              <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-pink-200/80 shadow-lg flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <div>
                  <p className="text-xs font-bold text-[#3D272B]">Minted Whimsy</p>
                  <p className="text-[10px] text-[#A26D77]">Art &amp; Digital Atelier</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scalloped Paper Lace Wave Divider (Bottom of Hero) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="w-full h-6 text-[#FFF9F6] fill-current"
        >
          <path d="M0,0 C25,20 50,20 75,0 C100,20 125,20 150,0 C175,20 200,20 225,0 C250,20 275,20 300,0 C325,20 350,20 375,0 C400,20 425,20 450,0 C475,20 500,20 525,0 C550,20 575,20 600,0 C625,20 650,20 675,0 C700,20 725,20 750,0 C775,20 800,20 825,0 C850,20 875,20 900,0 C925,20 950,20 975,0 C1000,20 1025,20 1050,0 C1075,20 1100,20 1125,0 C1150,20 1175,20 1200,0 L1200,24 L0,24 Z" />
        </svg>
      </div>
    </section>
  );
}
