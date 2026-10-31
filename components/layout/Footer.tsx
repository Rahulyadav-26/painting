import Link from "next/link";
import { Mail, Heart, Phone } from "lucide-react";
import PreviewLoaderButton from "@/components/ui/PreviewLoaderButton";

export default function Footer() {
  return (
    <footer className="relative bg-[#FCE5EB] text-[#5C3D44] pt-12 pb-8 border-t border-[#F8D2DC] overflow-hidden">
      {/* Top Scalloped Paper Lace Wave Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="w-full h-6 text-[#FFF9F6] fill-current"
        >
          <path d="M0,0 C25,20 50,20 75,0 C100,20 125,20 150,0 C175,20 200,20 225,0 C250,20 275,20 300,0 C325,20 350,20 375,0 C400,20 425,20 450,0 C475,20 500,20 525,0 C550,20 575,20 600,0 C625,20 650,20 675,0 C700,20 725,20 750,0 C775,20 800,20 825,0 C850,20 875,20 900,0 C925,20 950,20 975,0 C1000,20 1025,20 1050,0 C1075,20 1100,20 1125,0 C1150,20 1175,20 1200,0 L1200,24 L0,24 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#3D272B] tracking-tight flex items-center gap-1.5">
                <span className="italic">Minted Whimsy</span>
                <span className="text-sm text-[#E05D78]">♡</span>
              </span>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#9E7A82]">
              Illustration &amp; Art
            </p>
            <p className="text-xs text-[#6E4E56] leading-relaxed max-w-xs">
              Creating whimsical art that tells stories, sparks imagination, and warms hearts.
            </p>
          </div>

          {/* Quick Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D272B]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#6E4E56]">
              <li>
                <Link href="/#about" className="hover:text-[#E05D78] transition-colors">
                  About Minted Whimsy
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-[#E05D78] transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#E05D78] transition-colors">
                  All Goodies &amp; Art
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#E05D78] transition-colors">
                  Contact Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D272B]">
              Products
            </h4>
            <ul className="space-y-2 text-xs text-[#6E4E56]">
              <li>
                <Link
                  href="/shop?category=Planner"
                  className="hover:text-[#E05D78] transition-colors"
                >
                  Planners
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Notes"
                  className="hover:text-[#E05D78] transition-colors"
                >
                  Notes &amp; Sheets
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Stickers"
                  className="hover:text-[#E05D78] transition-colors"
                >
                  Sticker Packs
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Coloring%20pages"
                  className="hover:text-[#E05D78] transition-colors"
                >
                  Coloring Pages
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D272B]">
              Let&apos;s Connect
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com/mintedwhimsy0"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white text-[#E05D78] flex items-center justify-center hover:bg-[#E05D78] hover:text-white transition-all shadow-xs"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="mailto:mintedwhimsy0@gmail.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-white text-[#E05D78] flex items-center justify-center hover:bg-[#E05D78] hover:text-white transition-all shadow-xs"
              >
                <Mail size={15} />
              </a>
              <a
                href="tel:9926398315"
                aria-label="Phone"
                className="w-8 h-8 rounded-full bg-white text-[#E05D78] flex items-center justify-center hover:bg-[#E05D78] hover:text-white transition-all shadow-xs"
              >
                <Phone size={15} />
              </a>
            </div>
            <div className="text-[11px] text-[#6E4E56] space-y-0.5 pt-0.5">
              <p>
                <a
                  href="https://instagram.com/mintedwhimsy0"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E05D78] transition-colors"
                >
                  @mintedwhimsy0
                </a>
              </p>
              <p>
                <a href="mailto:mintedwhimsy0@gmail.com" className="hover:text-[#E05D78] transition-colors">
                  mintedwhimsy0@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:9926398315" className="hover:text-[#E05D78] transition-colors font-medium">
                  +91 9926398315
                </a>
              </p>
            </div>
            <p className="text-[11px] text-[#8C626C] italic font-serif flex items-center gap-1 pt-1">
              <Heart size={11} className="fill-[#E05D78] text-[#E05D78] shrink-0" />
              Thank you for supporting independent art!
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#F8D2DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#9A747D]">
          <p>© 2026 Minted Whimsy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#E05D78]">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/shipping" className="hover:text-[#E05D78]">
              Shipping &amp; Downloads
            </Link>
            <span>•</span>
            <PreviewLoaderButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
