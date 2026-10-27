"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Meera Krishnan",
    location: "Bangalore",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    text: "Absolutely in love with my Blushing Peonies painting! The colours are even more stunning in person, and the packaging was exquisite. Will definitely be buying more.",
    product: "Blushing Peonies",
  },
  {
    id: 2,
    name: "Rahul Desai",
    location: "Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    text: "My morning chai painting is the perfect addition to my kitchen. Such warmth and detail — every morning feels cozier now. Phenomenal artist!",
    product: "Morning Chai",
  },
  {
    id: 3,
    name: "Aanya Sharma",
    location: "Delhi",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    text: "The Sacred Lotus is exactly what my meditation room needed. The soft blush tones are so soothing. Arrived beautifully wrapped with a certificate of authenticity.",
    product: "Sacred Lotus",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#FFF8F5]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl font-bold text-[#2B2B2B] mb-3"
          >
            Loved by Art Lovers
          </h2>
          <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-[#F4B6C2] to-[#D6657E] mx-auto mb-4" />
          <p className="text-[#7A6F6F] text-lg max-w-md mx-auto">
            Real stories from collectors across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="card p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 12 12" fill="#F5A623">
                    <path d="M6 1l1.4 2.8L10.5 4l-2.25 2.2.53 3.1L6 7.75 3.22 9.3l.53-3.1L1.5 4l3.1-.2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#2B2B2B] text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Product tag */}
              <span className="text-[10px] font-semibold text-[#D6657E] bg-[#FFE3DC] rounded-full px-3 py-1 w-fit">
                {t.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-[#FFE3DC]">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#FFE3DC] shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2B2B2B]">{t.name}</div>
                  <div className="text-xs text-[#7A6F6F]">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
