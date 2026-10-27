"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Package, MapPin, Heart, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

type AccountTab = "orders" | "addresses" | "membership";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-12 min-h-[80vh]">
        <div className="section-container">
          {/* User Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB6C1] to-[#FF69B4] flex items-center justify-center text-white text-3xl font-bold shadow-md shrink-0">
              🎨
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl font-bold text-gray-900"
                >
                  Rahul Verma
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF69B4] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                  Patron Member
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">artcollector@example.com • Member since 2024</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/wishlist"
                className="btn-pill bg-[#FFF8F5] border border-pink-100 text-xs text-gray-700 hover:bg-pink-50 px-4 py-2 flex items-center gap-1.5"
              >
                <Heart size={14} className="text-[#FF69B4]" />
                Wishlist ({wishlistCount})
              </Link>
            </div>
          </div>

          {/* Account Tabs */}
          <div className="flex items-center gap-2 border-b border-pink-100 pb-3 mb-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === "orders"
                  ? "bg-[#FF69B4] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-pink-50"
              }`}
            >
              📦 My Art Orders
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === "addresses"
                  ? "bg-[#FF69B4] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-pink-50"
              }`}
            >
              📍 Delivery Addresses
            </button>
            <button
              onClick={() => setActiveTab("membership")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === "membership"
                  ? "bg-[#FF69B4] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-pink-50"
              }`}
            >
              ✨ Collector Perks
            </button>
          </div>

          {/* Orders Tab Content */}
          {activeTab === "orders" && (
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      Order #MW-748291
                    </span>
                    <span className="text-xs text-gray-500">Placed on October 18, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      ✓ Delivered Safely
                    </span>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(8500)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&auto=format&fit=crop"
                      alt="Blushing Peonies"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h3 className="font-bold text-gray-900 text-sm">Blushing Peonies</h3>
                    <p className="text-gray-500">by Priya Nair • Oil on Canvas (16×20 in)</p>
                    <p className="text-gray-400 mt-0.5">Signed Certificate #COA-9823 included</p>
                  </div>
                  <Link
                    href="/product/blushing-peonies"
                    className="text-xs text-[#FF69B4] font-semibold hover:underline flex items-center gap-1"
                  >
                    View Piece <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab Content */}
          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm relative">
                <span className="absolute top-4 right-4 text-[10px] font-bold text-[#FF69B4] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                  Primary Address
                </span>
                <h3 className="font-bold text-sm text-gray-900 mb-2">Home Atelier</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Rahul Verma
                  <br />
                  Flat 402, Lotus Residency, 12th Main Road
                  <br />
                  Indiranagar, Bengaluru, Karnataka – 560038
                  <br />
                  Phone: +91 98765 43210
                </p>
              </div>
            </div>
          )}

          {/* Membership Tab */}
          {activeTab === "membership" && (
            <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={24} className="text-[#FF69B4]" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl font-bold text-gray-900"
                >
                  Patron of the Arts Tier
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                As a valued collector with Minted Whimsy, you receive:
              </p>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>24-Hour VIP Private Access to all new weekly paintings</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>Complimentary insured shipping on all orders over ₹5,000</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>Direct consultation with our resident curators & framing advisors</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
