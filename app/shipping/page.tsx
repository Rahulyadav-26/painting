import Link from "next/link";
import { Truck, Box, RotateCcw, ShieldCheck, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "Shipping & Returns Policy",
  description:
    "Learn about Minted Whimsy's insured art delivery, custom crate packaging, and 14-day collector return guarantee.",
};

export default function ShippingPage() {
  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-12 sm:py-16">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#FF69B4] uppercase tracking-widest bg-pink-100 px-3 py-1 rounded-full">
              Delivery & Protection
            </span>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-4"
            >
              Shipping & Returns
            </h1>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Every original artwork is precious. We treat packaging as an extension of the art
              itself with bespoke wooden reinforced crating and transit insurance.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#FF69B4] flex items-center justify-center shrink-0">
                <Truck size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Delivery Timelines & Rates</h2>
                <ul className="text-xs text-gray-600 space-y-2 leading-relaxed">
                  <li>
                    <strong>Free Shipping Across India:</strong> Orders above ₹5,000 qualify for
                    100% complimentary courier delivery via BlueDart and Delhivery Express.
                  </li>
                  <li>
                    <strong>Standard Flat Rate:</strong> Orders under ₹5,000 are charged a flat ₹350
                    for insured transit.
                  </li>
                  <li>
                    <strong>Dispatch Time:</strong> Ready-to-ship paintings are inspected, varnished,
                    and packaged within 2 business days.
                  </li>
                  <li>
                    <strong>Transit Time:</strong> Metros (Bengaluru, Mumbai, Delhi, Chennai, Kolkata,
                    Hyderabad): 3–5 business days. Other cities: 4–7 business days.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Box size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Bespoke Wooden Crate Packaging</h2>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Paintings are first wrapped in acid-free glassine paper, followed by double-layer
                  shock-absorbing bubble wraps, heavy-duty edge corner guards, and nestled into a
                  reinforced timber crate.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <ShieldCheck size={16} /> 100% Full Value Transit Insurance Included
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <RotateCcw size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2">14-Day Collector Return Guarantee</h2>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  We want you to truly connect with your painting. If the piece doesn’t feel right
                  in your space, you may request a return within 14 days of delivery for a full
                  refund or studio credit.
                </p>
                <p className="text-xs text-gray-500">
                  Artwork must be in its original condition with its Certificate of Authenticity.
                  We arrange complimentary courier pickup from your address.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/shop" className="btn-pill btn-primary text-xs px-8 py-3">
              Browse Available Paintings
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
