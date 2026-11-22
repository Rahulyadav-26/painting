"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";

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
  { href: "/shop?category=Daily%20Planner", label: "🗓️ Daily Planner (Featured)" },
  { href: "/shop", label: "All Products" },
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
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    setMounted(true);
    checkAuth();
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [checkAuth]);

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
            {/* Logo: "Minted Whimsy ♡ • ILLUSTRATION & ART" */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#3D272B] tracking-tight flex items-center gap-1.5 group-hover:text-[#E05D78] transition-colors">
                  <span className="italic">Minted Whimsy</span>
                  <span className="text-xs text-[#E05D78]">♡</span>
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.26em] text-[#9E7A82] font-bold -mt-0.5">
                  Illustration &amp; Art
                </span>
              </div>
            </Link>

            {/* Center Nav — matching screenshot */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-semibold text-[#1E1B1D] hover:text-[#E05D78] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-semibold text-[#575153] hover:text-[#E05D78] transition-colors"
              >
                All Products
              </Link>
              <Link
                href="/account"
                className="text-sm font-semibold text-[#575153] hover:text-[#E05D78] transition-colors"
              >
                Track Order
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-[#575153] hover:text-[#E05D78] transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Icons (Matches Screenshot) */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:text-[#E05D78] hover:bg-pink-50/60 transition-colors cursor-pointer"
              >
                <Search size={18} />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:text-[#E05D78] hover:bg-pink-50/60 transition-colors"
              >
                <Heart size={18} />
                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold text-gray-500">
                  {mounted ? wishlistCount : 0}
                </span>
              </Link>

              {/* User Account Button */}
              <Link
                href={isAuthenticated ? "/account" : "/login"}
                aria-label={isAuthenticated ? "Account" : "Sign In"}
                title={isAuthenticated ? (user?.name ? `${user.name}'s Account` : "My Account") : "Sign In"}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:text-[#E05D78] hover:bg-pink-50/60 transition-colors text-xs font-bold"
              >
                {mounted && isAuthenticated && user?.name ? (
                  <span className="w-6 h-6 rounded-full bg-[#E05D78] text-white flex items-center justify-center text-[11px]">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={18} />
                )}
              </Link>

              {/* Cart Button (Theme Matching Filled Rose Circle with Bag & Badge) */}
              <Link href="/cart" aria-label="Cart" className="relative group">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#F67B92] to-[#E05D78] hover:from-[#EE6580] hover:to-[#C23D5B] transition-colors shadow-xs">
                  <ShoppingBag size={16} />
                </div>
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#E05D78] text-white border-2 border-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {mounted ? totalItems : 0}
                </span>
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
              <Link
                href={isAuthenticated ? "/account" : "/login"}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-800 hover:bg-pink-50 flex items-center justify-between border-t border-pink-50 mt-1 pt-3"
              >
                <span>👤 {mounted && isAuthenticated ? (user?.name || "My Account") : "Sign In / Join Atelier"}</span>
                {mounted && isAuthenticated && (
                  <span className="text-[10px] bg-pink-100 text-[#FF7096] px-2 py-0.5 rounded-full font-bold">
                    Patron
                  </span>
                )}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
