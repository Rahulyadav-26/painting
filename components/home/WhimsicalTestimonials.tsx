"use client";

import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

export default function WhimsicalTestimonials() {
  const reviews = [
    {
      quote:
        "Minted Whimsy's art is like a warm hug! The attention to detail and whimsical style are truly magical.",
      author: "Emily R.",
      handle: "@emilyreads",
      avatar: "🌸",
    },
    {
      quote:
        "Working with Minted Whimsy was a dream. They listened, understood my vision, and created something beyond beautiful!",
      author: "James L.",
      handle: "@storybook.studios",
      avatar: "🎨",
    },
    {
      quote:
        "The print I ordered is absolutely stunning! You can feel the love in every little detail.",
      author: "Sophia M.",
      handle: "@sophie.made",
      avatar: "✨",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-[#FFF9F6] via-[#FFF3F5] to-[#FFF9F6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE5EB] text-[#C23D5B] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Heart size={10} className="fill-[#C23D5B]" />
            KIND WORDS ♡
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D272B] tracking-tight">
            What lovely people say ♡
          </h2>
        </div>

        {/* Reviews 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#F8DCE2] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <p className="text-sm text-[#5C3F46] leading-relaxed italic font-serif">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-pink-50 mt-4">
                <div className="w-10 h-10 rounded-full bg-[#FCE7ED] text-[#E05D78] flex items-center justify-center font-bold text-sm">
                  {r.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3D272B]">{r.author}</h4>
                  <p className="text-[10px] text-[#9A747D]">{r.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
