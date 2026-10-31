"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function WhimsicalContact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#FFF9F6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE5EB] text-[#C23D5B] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Heart size={10} className="fill-[#C23D5B]" />
            GET IN TOUCH ♡
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D272B] tracking-tight">
            Let&apos;s stay in touch! ♡
          </h2>
        </div>

        {/* 3-Part Layout (Info, Form, Illustration) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#F6DCE2] shadow-sm">
          {/* Left Info Column (3.5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Email */}
            <a
              href="mailto:mintedwhimsy0@gmail.com"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF6F8] border border-[#FDE2E8] hover:border-[#E05D78] transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#E05D78] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E05D78] group-hover:text-white transition-colors">
                <Mail size={16} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-[#9A747D] uppercase font-bold">Email</p>
                <p className="text-xs font-bold text-[#3D272B] truncate group-hover:text-[#E05D78] transition-colors">
                  mintedwhimsy0@gmail.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:9926398315"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF6F8] border border-[#FDE2E8] hover:border-[#E05D78] transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#E05D78] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E05D78] group-hover:text-white transition-colors">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-[10px] text-[#9A747D] uppercase font-bold">Phone / Support</p>
                <p className="text-xs font-bold text-[#3D272B] group-hover:text-[#E05D78] transition-colors">
                  +91 9926398315
                </p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/mintedwhimsy0"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF6F8] border border-[#FDE2E8] hover:border-[#E05D78] transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-[#E05D78] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E05D78] group-hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div>
                <p className="text-[10px] text-[#9A747D] uppercase font-bold">Instagram</p>
                <p className="text-xs font-bold text-[#3D272B] group-hover:text-[#E05D78] transition-colors">@mintedwhimsy0</p>
              </div>
            </a>

            {/* Studio Hours */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF6F8] border border-[#FDE2E8]">
              <div className="w-8 h-8 rounded-xl bg-white text-[#E05D78] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-[10px] text-[#9A747D] uppercase font-bold">Business Hours</p>
                <p className="text-xs font-bold text-[#3D272B]">Mon – Sat: 10:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Middle Form Column (4.5 cols) */}
          <div className="lg:col-span-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#F6DCE2] bg-[#FFFBFD] text-xs text-[#3D272B] focus:border-[#E05D78] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#F6DCE2] bg-[#FFFBFD] text-xs text-[#3D272B] focus:border-[#E05D78] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#F6DCE2] bg-[#FFFBFD] text-xs text-[#3D272B] focus:border-[#E05D78] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F67B92] to-[#EE6580] hover:from-[#EE6580] hover:to-[#D9536E] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitted ? (
                  <>
                    <Check size={16} />
                    Message Sent with Love! ♡
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    SEND MESSAGE →
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Illustration & Speech Bubble (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-[#F8DCE2] shadow-sm bg-[#FFF5F7]">
              <Image
                src="/images/theme/whimsy-contact.jpg"
                alt="Minted Whimsy artist writing letters at her wooden art desk"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[11px] text-[#785962] max-w-xs leading-relaxed italic font-serif">
              &ldquo;We&apos;d love to hear from you! Whether it&apos;s a question, collaboration, or just a sweet hello!&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
