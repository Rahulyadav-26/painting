"use client";

import { useState } from "react";
import Link from "next/link";
import { Palette, Sparkles, Send, CheckCircle2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useToastStore } from "@/store/toastStore";

export default function CommissionsPage() {
  const [artist, setArtist] = useState("Any Available Artist");
  const [medium, setMedium] = useState("Oil on Canvas");
  const [size, setSize] = useState("18×24 in");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast("Please provide details about your commission concept.", "warning");
      return;
    }
    setSubmitted(true);
    addToast("Commission request sent to the studio! ✨", "success");
  };

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[#FF69B4] uppercase tracking-widest bg-pink-100 px-3 py-1 rounded-full">
              Bespoke Artworks
            </span>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-4"
            >
              Commission a Custom Painting
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Have a cherished memory, a specific color palette, or a special wall dimension in
              mind? Our artists accept limited bespoke commissions each month.
            </p>
          </div>

          {/* 4-Step Process */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: "01",
                title: "Concept & Brief",
                desc: "Share your vision, color mood, and reference photos with our studio curator.",
              },
              {
                step: "02",
                title: "Composition Sketch",
                desc: "The artist provides initial color wash sketches and composition studies for your approval.",
              },
              {
                step: "03",
                title: "Original Creation",
                desc: "The painting is brought to life layer by layer with archival-grade European pigments.",
              },
              {
                step: "04",
                title: "Varnish & Delivery",
                desc: "Hand-signed, UV-varnished, wax-sealed certificate, and delivered in custom wooden crates.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-2"
              >
                <span className="text-2xl font-black text-[#FF69B4]">{s.step}</span>
                <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-pink-100 shadow-sm max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  Commission Request Received!
                </h2>
                <p className="text-xs text-gray-600 max-w-md mx-auto mb-6">
                  Our resident curator and artist will review your specifications and reply with a
                  timeline and quote within 48 hours.
                </p>
                <Link href="/shop" className="btn-pill btn-primary text-xs px-6 py-2.5">
                  Browse Current Collection
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs">
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl font-bold text-gray-900"
                >
                  Request a Commission Quote
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Preferred Artist</label>
                    <select
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none"
                    >
                      <option>Any Available Artist</option>
                      <option>Priya Nair (Florals & Portraits)</option>
                      <option>Arjun Mehta (Mountain Landscapes)</option>
                      <option>Shreya Kaul (Large Fluid Abstracts)</option>
                      <option>Vikram Rao (Ink Wash & Botanicals)</option>
                      <option>Ananya Singh (Spiritual & Festive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Medium</label>
                    <select
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none"
                    >
                      <option>Oil on Canvas</option>
                      <option>Watercolour on Archival Paper</option>
                      <option>Acrylic on Canvas</option>
                      <option>Gouache</option>
                      <option>Mixed Media & Gold Leaf</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Approximate Dimensions</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none"
                  >
                    <option>12×16 in (Small / Intimate)</option>
                    <option>16×20 in (Medium)</option>
                    <option>18×24 in (Standard Statement)</option>
                    <option>24×36 in (Large Centerpiece)</option>
                    <option>30×40 in+ (Grand Gallery Format)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Describe Your Vision & Color Preferences *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what you envision — theme, mood, references, room type..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-pill btn-primary text-xs py-3.5 px-8 self-start flex items-center gap-2"
                >
                  <Send size={14} /> Submit Commission Brief
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
