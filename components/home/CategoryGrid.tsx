"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const curatedGenres = [
  {
    name: "Floral & Botanical",
    category: "Floral",
    description: "Lush peonies, sacred waterlilies & botanical oils",
    count: "12 Original Canvases",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop",
  },
  {
    name: "Abstract Expressions",
    category: "Abstract",
    description: "Textured impasto, fluid pigments & meditative forms",
    count: "9 Original Canvases",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&auto=format&fit=crop",
  },
  {
    name: "Serene Landscapes",
    category: "Landscape",
    description: "Himalayan mists, golden hour hills & tranquil lakes",
    count: "8 Original Canvases",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&auto=format&fit=crop",
  },
  {
    name: "Spiritual & Heritage",
    category: "Spiritual",
    description: "24k gold leaf embellishments & sacred iconography",
    count: "7 Original Canvases",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop",
  },
  {
    name: "Portraits & Figurative",
    category: "Portrait",
    description: "Intimate feminine grace & contemporary soul studies",
    count: "6 Original Canvases",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop",
  },
  {
    name: "Wildlife & Nature",
    category: "Wildlife",
    description: "Ancient banyans, wild fauna & forest atmospheres",
    count: "5 Original Canvases",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop",
  },
  {
    name: "Cityscape & Heritage",
    category: "Cityscape",
    description: "Jaipur courtyards, heritage archways & old alleys",
    count: "6 Original Canvases",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop",
  },
  {
    name: "Still Life & Warmth",
    category: "Still Life",
    description: "Morning chai, heirloom ceramics & intimate domesticity",
    count: "5 Original Canvases",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 sm:py-28 bg-[#FDE2EE]/40 border-t border-[#FFD6E5]">
      <div className="container">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold text-[#FF7096] uppercase tracking-widest bg-white border border-[#FFD6E5] px-4 py-1.5 rounded-full mb-3 inline-block shadow-xs">
            Curated Collections
          </span>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-5xl font-bold text-[#2B2329] tracking-tight mt-2 mb-3"
          >
            Explore by Artistic Genre
          </h2>
          <div className="blushy-divider">
            <div className="blushy-divider-line" />
            <div className="blushy-divider-dot" />
            <div className="blushy-divider-line" />
          </div>
          <p className="blushy-section-subtitle max-w-lg mx-auto">
            Discover original paintings categorized by mood, philosophy, and architectural harmony
          </p>
        </motion.div>

        {/* 8 Visual Art Genre Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curatedGenres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group"
            >
              <Link
                href={`/shop?category=${encodeURIComponent(genre.category)}`}
                className="relative block h-72 sm:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border-[1.5px] border-[#FFD6E5] hover:border-[#FF7096] transition-all duration-500"
              >
                {/* Background Artwork Image */}
                <Image
                  src={genre.image}
                  alt={genre.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Multi-stop Ambient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-all duration-300" />

                {/* Top Badge: Artwork Count */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {genre.count}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end text-left">
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-xl sm:text-2xl font-bold text-white mb-1 leading-snug group-hover:text-[#FFD6E5] transition-colors"
                  >
                    {genre.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mb-3 font-light">
                    {genre.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFD6E5] group-hover:translate-x-1 transition-transform">
                    <span>Explore Genre</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
