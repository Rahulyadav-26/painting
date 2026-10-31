"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Download,
  Tablet,
  Printer,
  CheckCircle2,
  Clock,
  Heart,
  Droplets,
  Utensils,
  Star,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";

export default function DailyPlannerSection() {
  const planner = products[0]; // Autumn Harvest Digital Daily Planner
  const [selectedImageIndex, setSelectedImageIndex] = useState(1); // Default to tablet mockup
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const images = [
    {
      src: "/images/products/autumn-daily-planner-tablet-stand-mockup.jpg",
      label: "iPad & Tablet Mockup",
      sublabel: "GoodNotes / Notability",
    },
    {
      src: "/images/products/autumn-daily-planner-phone-mockup.jpg",
      label: "Smartphone Mobile Mockup",
      sublabel: "Everyday Pocket Planner",
    },
    {
      src: "/images/products/autumn-daily-planner-aesthetic-flatlay.jpg",
      label: "Autumn Illustrated Flatlay",
      sublabel: "Aesthetic Warm Vibes",
    },
    {
      src: "/images/products/autumn-daily-planner-original.jpg",
      label: "Printable Layout Sheet",
      sublabel: "High-Res Digital Canvas",
    },
  ];

  const whatsInside = [
    {
      icon: Clock,
      title: "Today's Schedule",
      desc: "Hourly time-blocking slots from 6 AM to 11 PM for focused productivity.",
    },
    {
      icon: CheckCircle2,
      title: "To-Do List & Top Priority",
      desc: "Dedicated checkboxes and spotlight callout for your most vital daily win.",
    },
    {
      icon: Utensils,
      title: "Today's Meal Planner",
      desc: "Structured sections for breakfast, lunch, wholesome snacks, and dinner.",
    },
    {
      icon: Droplets,
      title: "Water Intake Tracker",
      desc: "8 hydrations glasses to tick off and stay energized throughout the day.",
    },
    {
      icon: Heart,
      title: "Selfcare & Wellness",
      desc: "Daily mindfulness check-ins (Rest, be kind to yourself, you got this).",
    },
    {
      icon: Sparkles,
      title: "Notes & Daily Inspiration",
      desc: "Free-form brainstorm space with a sweet motivational autumn quote.",
    },
  ];

  const handleAddToCart = () => {
    if (!planner) return;
    addItem(planner, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (!planner) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F2] to-[#FFF5EC] border-y border-[#F3E6D8] relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD4B8]/40 border border-[#D8BC9B] text-[#7A4B23] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} className="text-[#B96A28]" />
            Featured Collection • Daily Planner
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3E2718] tracking-tight mb-4">
            Autumn Harvest Digital Daily Planner
          </h2>
          <p className="text-base sm:text-lg text-[#6B5342] leading-relaxed">
            Whether you are organizing your daily hustle, tracking your wellness goals, or just slowing down to enjoy the cozy autumn vibes, this template has everything you need in one beautifully cohesive layout.
          </p>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Gallery & Mockup Viewer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Display Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white border border-[#E9D8C7] group">
              <Image
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
                priority
              />

              {/* Watermark Free Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-200/80 shadow-sm flex items-center gap-1.5 text-xs font-bold text-[#844318]">
                <ShieldCheck size={14} className="text-[#C86422]" />
                WATERMARK FREE UPON DOWNLOAD
              </div>

              {/* Instant Download Pill */}
              <div className="absolute top-4 right-4 bg-[#4A321E]/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <Download size={13} />
                Instant Download
              </div>

              {/* Image Label Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 rounded-2xl text-white">
                <p className="font-bold text-sm">{images[selectedImageIndex].label}</p>
                <p className="text-xs text-amber-200/90">{images[selectedImageIndex].sublabel}</p>
              </div>
            </div>

            {/* Thumbnail Selectors (All 4 Mockups) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`text-left p-2.5 rounded-2xl border transition-all flex items-center gap-2.5 ${
                    selectedImageIndex === idx
                      ? "border-[#B96A28] bg-white ring-2 ring-[#B96A28]/30 shadow-md"
                      : "border-[#EADCCF] bg-white/70 hover:bg-white text-gray-600"
                  }`}
                >
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                    <Image src={img.src} alt={img.label} fill className="object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-[#3E2718] truncate">{img.label}</p>
                    <p className="text-[10px] text-[#826955] truncate">{img.sublabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details, What's Inside & CTAs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#5A412F]">5.0 (48 Verified Collectors)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C180E] mb-2">
                Autumn Harvest Digital Daily Planner
              </h3>

              <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl sm:text-4xl font-black text-[#A14B15]">
                  ${planner.salePrice ?? planner.price}
                </span>
                {planner.salePrice && (
                  <span className="text-base text-gray-400 line-through">${planner.price}</span>
                )}
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Special Autumn Launch Offer
                </span>
              </div>

              <p className="text-xs text-[#7A614F] leading-relaxed">
                Includes high-resolution digital file with full commercial-free personal usage rights. Delivered automatically to your email after verification.
              </p>
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#4D3624]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-[#ECD9C9]">
                <Tablet size={16} className="text-[#B96A28]" />
                <span>GoodNotes & Notability</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-[#ECD9C9]">
                <Printer size={16} className="text-[#B96A28]" />
                <span>Print at Home (A4 / Letter)</span>
              </div>
            </div>

            {/* What's Inside Section Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A4B23]">
                What&apos;s Inside The Layout:
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {whatsInside.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-white/90 border border-[#EFE3D5] shadow-xs hover:border-[#D6A980] transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-[#FBF2E9] text-[#A14B15] shrink-0 mt-0.5">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#352115]">{item.title}</h5>
                        <p className="text-[11px] text-[#786150] leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAs & Purchase Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#984A1A] hover:bg-[#833B12] text-white font-bold text-sm shadow-lg shadow-orange-950/15 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  {added ? "Added to Cart! 🎨" : "Add to Cart • $" + (planner.salePrice ?? planner.price)}
                </button>

                <Link
                  href={`/product/${planner.slug}`}
                  className="py-4 px-5 rounded-2xl bg-white border border-[#DBC1A7] text-[#472E1D] hover:bg-[#FFF8F2] font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye size={16} />
                  Full Details
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#8C715D] text-center">
                <span>✓ Instant Download PDF & PNG</span>
                <span>•</span>
                <span>✓ 100% Watermark-Free</span>
                <span>•</span>
                <span>✓ Direct UPI & Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
