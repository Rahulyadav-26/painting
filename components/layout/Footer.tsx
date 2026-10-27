import Link from "next/link";
import { Palette, Mail } from "lucide-react";
import PreviewLoaderButton from "@/components/ui/PreviewLoaderButton";

const footerLinks = {
  Shop: [
    { label: "All Paintings", href: "/shop" },
    { label: "Abstract", href: "/shop?category=Abstract" },
    { label: "Floral", href: "/shop?category=Floral" },
    { label: "Landscape", href: "/shop?category=Landscape" },
    { label: "On Sale", href: "/shop?sale=true" },
  ],
  "Our Studio": [
    { label: "About Us", href: "/about" },
    { label: "Our Artists", href: "/about#artists" },
    { label: "Commissions", href: "/commissions" },
    { label: "Care Guide", href: "/care" },
  ],
  Help: [
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms & Privacy", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{ background: "#2B2B2B" }}
      className="text-[#7A6F6F]"
    >
      {/* Top wave */}
      <div
        style={{
          background: "linear-gradient(180deg, #FFF8F5 0%, transparent 100%)",
          height: "48px",
          clipPath: "ellipse(55% 100% at 50% 0%)",
        }}
      />

      <div className="section-container pb-12 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-3xl">
                🐰
              </span>
              <span
                style={{ fontFamily: "var(--font-body)" }}
                className="text-2xl font-black text-[#FF7096]"
              >
                Minted Whimsy
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-300">
              Original handmade paintings by India's most talented independent artists —
              made with love, packed with care.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D6657E] text-[#7A6F6F] hover:text-white transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D6657E] text-[#7A6F6F] hover:text-white transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a
                href="mailto:sharmadeeepsh123@gmail.com"
                aria-label="Email us"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D6657E] text-[#7A6F6F] hover:text-white transition-all duration-300"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                style={{ fontFamily: "var(--font-display)" }}
                className="text-white font-semibold mb-4 text-sm tracking-wide uppercase"
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-[#F4B6C2] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Minted Whimsy. All rights reserved.
          </p>
          <PreviewLoaderButton />
          <p className="text-xs">
            Handcrafted with{" "}
            <span
              style={{ color: "#FF7096" }}
              aria-hidden="true"
            >
              ♥
            </span>{" "}
            for art collectors across India
          </p>
        </div>
      </div>
    </footer>
  );
}
