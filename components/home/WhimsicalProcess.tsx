"use client";

import { motion } from "framer-motion";
import { Heart, Lightbulb, Pencil, Palette, Sparkles, Gift } from "lucide-react";

export default function WhimsicalProcess() {
  const steps = [
    {
      num: "01",
      icon: Lightbulb,
      title: "Inspiration",
      desc: "Every piece begins with a spark—nature, stories, or a sweet memory.",
    },
    {
      num: "02",
      icon: Pencil,
      title: "Sketching",
      desc: "I sketch and explore ideas to shape the perfect composition.",
    },
    {
      num: "03",
      icon: Palette,
      title: "Color & Details",
      desc: "Bringing the piece to life with color, textures, and little details.",
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Finishing Touches",
      desc: "Polishing every detail with love and a touch of magic.",
    },
    {
      num: "05",
      icon: Gift,
      title: "Final Artwork",
      desc: "Your artwork is ready to inspire and bring joy!",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FFF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE5EB] text-[#C23D5B] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Heart size={10} className="fill-[#C23D5B]" />
            MY CREATIVE PROCESS ♡
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D272B] tracking-tight">
            From idea to magic ♡
          </h2>
        </div>

        {/* 5-step visual roadmap */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 border-t-2 border-dashed border-[#F5CAD4] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step circle node */}
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#F6B2C0] shadow-md flex items-center justify-center text-[#E05D78] mb-4 group-hover:scale-110 group-hover:border-[#E05D78] transition-all relative">
                    <Icon size={24} />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#F67B92] text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#3D272B] mb-1.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#7A5A62] leading-relaxed max-w-xs font-sans">
                    {st.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
