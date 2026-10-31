"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const faqs = [
  {
    q: "Are all paintings on Minted Whimsy original works?",
    a: "Yes, 100%! Every painting featured in our gallery is an authentic, one-of-a-kind original created by hand using archival pigments. We do not sell mass-produced poster prints disguised as art.",
  },
  {
    q: "Does my painting come with a Certificate of Authenticity?",
    a: "Yes. Every single original artwork includes an official, wax-sealed Certificate of Authenticity signed directly by the artist, detailing the artwork title, year of completion, dimensions, medium, and registration number.",
  },
  {
    q: "How is the artwork safely packed for delivery?",
    a: "We pack each piece in acid-free glassine wrapping, heavy impact foam, edge corner guards, and enclosed in custom timber crates to eliminate transit vibrations or impacts.",
  },
  {
    q: "What if the painting arrives damaged or looks different in my room?",
    a: "All shipments are 100% insured. If any transit issue occurs, we immediately arrange full compensation or replacement. Furthermore, we offer a 14-day collector return policy if the piece does not harmonize with your home.",
  },
  {
    q: "How do I download and use my digital planners and sticker files?",
    a: "Immediately upon checkout or payment verification, your high-resolution files are available for instant download and delivered to your email. You can import them directly into GoodNotes, Notability, or print them at home.",
  },
  {
    q: "Do you ship internationally outside India?",
    a: "Yes, we ship internationally via DHL Express. Please contact mintedwhimsy0@gmail.com with the piece you want and your destination country for international customs and shipping quotes.",
  },
  {
    q: "How do I care for and clean my painting?",
    a: "Please see our Artwork Care Guide. For stretched oils and acrylics, light dusting with a dry soft natural-hair brush every few months is all that is required. Never use wet wipes or detergents.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-12 sm:py-16">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#FF69B4] uppercase tracking-widest bg-pink-100 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-4"
            >
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-gray-600">
              Everything you need to know about purchasing, shipping, and collecting original art
              from Minted Whimsy.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 text-sm hover:text-[#FF69B4] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#FF69B4] shrink-0 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-pink-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 text-center text-xs">
            <p className="text-gray-600 mb-3">
              Still have questions? Our curator team is here to assist you.
            </p>
            <Link href="/contact" className="btn-pill btn-primary text-xs px-6 py-2.5 inline-block">
              Contact Studio Curators
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
