import Link from "next/link";
import { Sun, Droplets, Wind, Shield, Sparkles } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "Artwork Care Guide",
  description:
    "How to preserve and care for your original oil, watercolour, and acrylic paintings from Minted Whimsy.",
};

export default function CareGuidePage() {
  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-12 sm:py-16">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#FF69B4] uppercase tracking-widest bg-pink-100 px-3 py-1 rounded-full">
              Collector Preservation
            </span>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-4"
            >
              Artwork Care & Framing Guide
            </h1>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Your original painting is an heirloom created with archival pigments. Follow these
              guidelines to ensure it remains vibrant for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Sun size={20} />
              </div>
              <h2 className="font-bold text-gray-900 text-base">Light & Sun Exposure</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Avoid hanging original paintings in direct, continuous sunlight. While our artists
                use professional UV-protective satin varnish, indirect ambient light preserves pigment
                luminosity best over decades.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <Droplets size={20} />
              </div>
              <h2 className="font-bold text-gray-900 text-base">Humidity & Moisture</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Keep canvases away from steam sources such as unventilated bathrooms or directly
                above kitchen stoves. Maintain room humidity between 40% and 60% for optimal canvas
                tension.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <Wind size={20} />
              </div>
              <h2 className="font-bold text-gray-900 text-base">Dusting & Cleaning</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Never use damp cloths, cleaning sprays, or household detergents on an oil or
                acrylic surface. Gently dust every few months using a soft dry natural bristle brush
                or feather duster.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#FF69B4] flex items-center justify-center">
                <Shield size={20} />
              </div>
              <h2 className="font-bold text-gray-900 text-base">Professional Framing</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                For watercolours and works on paper, frame behind archival glass with acid-free matting
                to keep the paper from touching the glass. For stretched canvases, floating wood
                frames offer stunning presentation without glass.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/shop" className="btn-pill btn-primary text-xs px-8 py-3">
              Explore Our Collection
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
