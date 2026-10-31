"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Palette, Sparkles, Wand2, Mail, ShoppingBag } from "lucide-react";

export default function WhimsicalServices() {
  const services = [
    {
      icon: Palette,
      emoji: "🎨",
      title: "Illustration",
      desc: "Whimsical illustrations for books, prints, merchandise and more.",
    },
    {
      icon: Sparkles,
      emoji: "👧",
      title: "Character Design",
      desc: "Original characters full of personality and charm.",
    },
    {
      icon: Wand2,
      emoji: "🏰",
      title: "Concept Art",
      desc: "Visual concepts and mood boards for your stories and projects.",
    },
    {
      icon: Mail,
      emoji: "💌",
      title: "Custom Commissions",
      desc: "Personalised art made just for you or your special someone.",
    },
    {
      icon: ShoppingBag,
      emoji: "🛍️",
      title: "Licensing & Merch",
      desc: "Art licensing and product design with whimsical flair.",
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-24 bg-gradient-to-b from-[#FFF9F6] via-[#FFF3F5] to-[#FFF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE5EB] text-[#C23D5B] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Heart size={10} className="fill-[#C23D5B]" />
            WHAT I DO ♡
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D272B] tracking-tight">
            Services ♡
          </h2>
        </div>

        {/* 5 Cards Row / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#F8DCE2] shadow-xs hover:shadow-xl hover:border-[#F67B92] hover:-translate-y-1.5 transition-all duration-300 group"
              >
                {/* Spot Icon Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-[#FFF0F4] border border-[#FAD6DF] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  <span>{s.emoji}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#3D272B] mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-[#7A5A62] leading-relaxed font-sans">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Pill */}
        <div className="text-center mt-12">
          <Link
            href="/commissions"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white border border-[#F6C2CE] text-[#C23D5B] hover:bg-[#FCE5EB] font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all"
          >
            <span>Have a project in mind? Let&apos;s talk</span>
            <span>♡</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
