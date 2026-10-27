"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

/* ── Announcement bar items ── */
const announcements = [
  "✨ Original Hand-Painted Canvases by Independent Indian Masters",
  "📜 Wax-Sealed Certificate of Authenticity with Every Piece",
  "🚚 Complimentary Insured Wooden Crate Delivery Across India",
  "🎨 100% Artist-Direct Royalties • Zero Gallery Exploitation",
  "🌿 Archival Museum-Grade Pigments on Heavyweight Belgian Linen",
];

/* ── Nav links ── */
const shopLinks = [
  { href: "/shop", label: "All Paintings" },
  { href: "/shop?category=Abstract", label: "Abstract" },
  { href: "/shop?category=Floral", label: "Floral" },
  { href: "/shop?category=Landscape", label: "Landscape" },
  { href: "/shop?category=Portrait", label: "Portrait" },
  { href: "/shop?category=Spiritual", label: "Spiritual" },
  { href: "/shop?category=Wildlife", label: "Wildlife" },
  { href: "/shop?category=Cityscape", label: "Cityscape" },
  { href: "/shop?category=Still Life", label: "Still Life" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [mounted, setMounted] = useState(false);

  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchVal.trim())}`;
    }
  };

  const marqueeItems = [...announcements, ...announcements];

  return (
    <>
      {/* ── Top Announcement Marquee (Luxury Espresso & Rose-Gold Banner) ── */}
      <div
        className="overflow-hidden py-2 text-[#FFD6E5] text-[11px] font-semibold tracking-wider uppercase border-b border-white/10"
        style={{
          background: "linear-gradient(90deg, #1C181A 0%, #2E2228 50%, #1C181A 100%)",
        }}
      >
        <div className="marquee-track">
          {marqueeItems.map((text, i) => (
            <span key={i} className="inline-block px-8 whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Navbar (Clean White with Soft Curves) ── */}
      <header
        className="sticky top-0 z-40 transition-all duration-300 bg-white"
        style={{
          boxShadow: scrolled
            ? "0 4px 20px rgba(244, 143, 177, 0.18)"
            : "0 2px 10px rgba(244, 143, 177, 0.08)",
          borderBottom: "1.5px solid #FFD6E5",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
            {/* Logo: Bunny Face + Editorial "Minted Whimsy" */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <span className="text-2xl sm:text-3xl transform group-hover:scale-110 transition-transform">
                🐰
              </span>
              <div className="flex flex-col">
                <span
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl sm:text-2xl font-bold text-[#2B2329] tracking-tight group-hover:text-[#FF7096] transition-colors"
                >
                  Minted Whimsy
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#A87B8A] font-semibold -mt-1 hidden sm:block">
                  Fine Art Collective
                </span>
              </div>
            </Link>

            {/* Center Nav — desktop */}
            <nav className="hidden md:flex items-center gap-1.5">
              {/* Home Pill Button */}
              <Link
                href="/"
                className="btn-pill btn-primary text-xs px-5 py-2 font-bold shadow-sm"
              >
                Home
              </Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-50 transition-colors text-gray-700"
                >
                  🛍️ Shop
                  <ChevronDown
                    size={14}
                    className={`transition-transform text-[#FF7096] ${shopOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-52 rounded-3xl shadow-xl border border-pink-100 py-2.5 z-50 bg-white"
                    >
                      {shopLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-5 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-[#FF7096] transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/about"
                className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-50 transition-colors text-gray-700"
              >
                ♥ About
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-50 transition-colors text-gray-700"
              >
                ✉️ Contact
              </Link>
            </nav>

            {/* Right Action Icons (Matches Screenshot 1 & 2) */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-pink-200 bg-white text-gray-600 hover:bg-pink-50 hover:text-[#FF7096] transition-colors"
              >
                <Search size={16} />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative w-9 h-9 flex items-center justify-center rounded-full border border-pink-200 bg-white text-gray-600 hover:bg-pink-50 hover:text-[#FF7096] transition-colors"
              >
                <Heart size={16} />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF7096] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account Button (Round white button with thin pink border) */}
              <Link
                href="/account"
                aria-label="Account"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-pink-200 bg-white text-[#FF7096] hover:bg-pink-50 transition-colors"
              >
                <User size={16} />
              </Link>

              {/* Cart Button (Solid Pink Circle with Shopping Bag Icon) */}
              <Link href="/cart" aria-label="Cart" className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm bg-gradient-to-r from-[#FFA0B4] to-[#FF7096] hover:scale-105 transition-transform">
                  {mounted && totalItems > 0 ? (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                    >
                      {totalItems}
                    </motion.span>
                  ) : (
                    <ShoppingBag size={16} />
                  )}
                </div>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-pink-200 bg-white text-gray-600 hover:bg-pink-50 ml-1"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Quick Search Dropdown Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-3"
              >
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search size={15} className="absolute left-4 text-gray-400" />
                  <input
                    type="text"
                    autoFocus
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search paintings (e.g. Lotus, Peonies, Watercolour, Oil)..."
                    className="w-full pl-10 pr-24 py-2 rounded-full bg-[#FDE2EE]/50 border border-pink-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-3 py-1 rounded-full bg-[#FF7096] text-white text-[11px] font-bold hover:bg-[#E0659B]"
                  >
                    Search
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden sticky top-16 z-30 border-b border-pink-100 overflow-hidden bg-white shadow-lg"
          >
            <div className="container py-4 flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-[#FF7096] bg-pink-50"
              >
                🏠 Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-800 hover:bg-pink-50"
              >
                🛍️ All Paintings
              </Link>
              <div className="pl-4 flex flex-col gap-1">
                {shopLinks.slice(1, 7).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-1.5 rounded-xl text-xs text-gray-500 hover:text-[#FF7096]"
                  >
                    — {l.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-800 hover:bg-pink-50"
              >
                ♥ About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-800 hover:bg-pink-50"
              >
                ✉️ Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
