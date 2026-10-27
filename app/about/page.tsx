import Image from "next/image";
import Link from "next/link";
import { Sparkles, Palette, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "About Our Studio",
  description:
    "Learn about Minted Whimsy — an independent art collective empowering Indian fine artists and connecting collectors with original paintings.",
};

const artists = [
  {
    name: "Priya Nair",
    location: "Kochi, Kerala",
    specialty: "Floral Still Lifes & Gouache Portraits",
    bio: "Priya infuses Kerala's lush flora and intimate feminine grace into velvet-textured oil and gouache studies. Each piece reflects deep quietude and natural harmony.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
  },
  {
    name: "Arjun Mehta",
    location: "Dharamshala, Himachal Pradesh",
    specialty: "Himalayan Watercolours & Serene Landscapes",
    bio: "Arjun paints on cold-press European archival paper, capturing morning mists, dramatic alpine light, and silent ridgelines with luminous translucent washes.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
  },
  {
    name: "Shreya Kaul",
    location: "Srinagar / New Delhi",
    specialty: "Large-Format Abstract & Fluid Mixed Media",
    bio: "Shreya explores memories of monsoon rains and ocean depths using layers of resin, iridescent pigments, and raw intuitive brush movements.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
  },
  {
    name: "Vikram Rao",
    location: "Bengaluru, Karnataka",
    specialty: "Botanical Oils & Contemporary Ink-Wash",
    bio: "Drawing from century-old banyan trees and Karnataka wildlife, Vikram blends classical Eastern brush strokes with modern impressionistic oil palettes.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
  },
  {
    name: "Ananya Singh",
    location: "Jaipur, Rajasthan",
    specialty: "Spiritual Acrylics & Gold Leaf Embellishments",
    bio: "Rooted in sacred Indian iconography and festive Diwali colours, Ananya’s celebratory canvases radiate warmth, protection, and auspicious joy.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="py-14 sm:py-20">
        <div className="section-container">
          {/* Header Story */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <span className="inline-block text-xs font-bold text-[#FF7096] uppercase tracking-wider bg-white border border-[#FFD6E5] px-4 py-1.5 rounded-full shadow-xs mb-4">
              Our Studio & Story
            </span>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl sm:text-5xl font-extrabold text-[#2B2B2B] mb-5 leading-tight tracking-tight"
            >
              Where Indian Artistry Meets Whimsical Living
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Minted Whimsy began with a simple belief: that everyone deserves to live surrounded by
              authentic, soulful artwork. Not mass-produced prints from overseas factories, but
              real paintings created with brushstrokes, intuition, and heartfelt dedication.
            </p>
          </div>

          {/* Core Values Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
            <div className="card blushy-card p-7 sm:p-8 flex flex-col gap-3.5 rounded-3xl bg-white border-[1.5px] border-[#FFD6E5]">
              <div className="w-12 h-12 rounded-2xl bg-[#FDE2EE] flex items-center justify-center text-[#FF7096]">
                <Palette size={24} />
              </div>
              <h3
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg font-bold text-gray-900"
              >
                100% Artist Direct
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We eliminate exploitative gallery markups. Our artists receive fair royalties and
                direct collector appreciation for every single canvas sold.
              </p>
            </div>

            <div className="card blushy-card p-7 sm:p-8 flex flex-col gap-3.5 rounded-3xl bg-white border-[1.5px] border-[#FFD6E5]">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck size={24} />
              </div>
              <h3
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg font-bold text-gray-900"
              >
                Archival & Hand-Signed
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every painting arrives with an official, wax-sealed Certificate of Authenticity
                signed by the creator, guaranteeing original provenance for collectors.
              </p>
            </div>

            <div className="card blushy-card p-7 sm:p-8 flex flex-col gap-3.5 rounded-3xl bg-white border-[1.5px] border-[#FFD6E5]">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600">
                <HeartHandshake size={24} />
              </div>
              <h3
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg font-bold text-gray-900"
              >
                Custom Transit Packaging
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Original artworks deserve gentle transit. We pack every canvas in custom wooden
                crates with moisture shields and reinforced corner protectors.
              </p>
            </div>
          </div>

          {/* Artists Section */}
          <div id="artists" className="mb-20 sm:mb-24">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="blushy-section-title">🎨 Meet Our Resident Artists 🎨</h2>
              <div className="blushy-divider">
                <div className="blushy-divider-line" />
                <div className="blushy-divider-dot" />
                <div className="blushy-divider-line" />
              </div>
              <p className="blushy-section-subtitle">
                The gifted painters, visionaries, and storytellers behind our collection.
              </p>
            </div>

            {/* Centered wrap grid so odd counts never leave uneven void on the right */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {artists.map((artist) => (
                <div
                  key={artist.name}
                  className="card blushy-card p-6 sm:p-7 rounded-3xl bg-white border-[1.5px] border-[#FFD6E5] flex flex-col gap-4 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FFD6E5] shrink-0 shadow-xs">
                      <Image
                        src={artist.avatar}
                        alt={artist.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-gray-900">{artist.name}</h4>
                      <p className="text-xs text-[#FF7096] font-semibold">{artist.location}</p>
                      <p className="text-[11px] text-gray-500 font-medium">{artist.specialty}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed flex-1">{artist.bio}</p>
                  <Link
                    href={`/shop?q=${encodeURIComponent(artist.name)}`}
                    className="text-xs font-bold text-[#FF7096] hover:text-[#E0659B] flex items-center gap-1 self-start transition-colors"
                  >
                    View {artist.name}&apos;s Works →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Banner CTA */}
          <div className="bg-gradient-to-r from-[#FFA0B4] via-[#FF7096] to-[#E0659B] rounded-3xl p-8 sm:p-14 text-white text-center shadow-lg border border-pink-200">
            <Sparkles size={36} className="mx-auto mb-3 opacity-95" />
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight"
            >
              Bring an Original Home Today
            </h2>
            <p className="text-xs sm:text-sm text-white/95 max-w-lg mx-auto mb-6 leading-relaxed">
              Each painting is a unique one-of-one creation that can never be replicated. Find the
              piece that speaks to your spirit.
            </p>
            <Link
              href="/shop"
              className="btn-pill bg-white text-[#FF7096] hover:text-[#E0659B] font-bold text-xs px-8 py-3.5 hover:bg-pink-50 shadow-md inline-block transition-transform hover:-translate-y-0.5"
            >
              Explore All Paintings
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
