import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Minted Whimsy — Original Paintings & Art",
    template: "%s | Minted Whimsy",
  },
  description:
    "Discover original handmade paintings and fine art by independent Indian artists. Cute packaging, certificate of authenticity, and nationwide free shipping.",
  keywords: [
    "original paintings",
    "art prints India",
    "buy paintings online",
    "cute packaging art",
    "Minted Whimsy paintings",
    "watercolour",
    "oil painting",
  ],
  openGraph: {
    title: "Minted Whimsy — Original Paintings & Art",
    description:
      "Discover original paintings and fine art prints with always cute packaging.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF7096",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable}`}
    >
      <body>
        <PageLoadingOverlay />
        {children}
      </body>
    </html>
  );
}
