import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "We'd love to hear from you! Whether you have questions about our handmade products, custom orders, shipping, or anything else, we're here to help.",
};

export default function ContactPage() {
  return (
    <MainLayout>
      <section className="w-full bg-[#FDE2EE] min-h-[70vh] py-16 sm:py-24 px-6 sm:px-8 flex items-center justify-center">
        <div
          style={{ maxWidth: "660px" }}
          className="w-full mx-auto text-left"
        >
          {/* Main Title */}
          <h1 className="text-3xl sm:text-[36px] font-bold text-[#2B2329] tracking-tight mb-3">
            Contact Us
          </h1>

          {/* Subtitle & Introduction */}
          <div className="mb-6 space-y-1">
            <p className="italic text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              We&apos;d love to hear from you!
            </p>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              Whether you have questions about our handmade products, custom orders, shipping, or
              anything else, we&apos;re here to help.
            </p>
          </div>

          {/* Customer Support */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-[19px] font-bold text-[#2B2329] mb-1">
              Customer Support
            </h2>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              Email:{" "}
              <a
                href="mailto:mintedwhimsy0@gmail.com"
                style={{ color: "#3B5998", textDecoration: "underline" }}
                className="hover:opacity-80 transition-opacity font-normal"
              >
                mintedwhimsy0@gmail.com
              </a>
            </p>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              Phone:{" "}
              <a
                href="tel:9926398315"
                style={{ color: "#3B5998", textDecoration: "underline" }}
                className="hover:opacity-80 transition-opacity font-normal"
              >
                9926398315
              </a>
            </p>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              Instagram:{" "}
              <a
                href="https://instagram.com/mintedwhimsy0"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3B5998", textDecoration: "underline" }}
                className="hover:opacity-80 transition-opacity font-normal"
              >
                @mintedwhimsy0
              </a>
            </p>
          </div>

          {/* Business Hours */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-[19px] font-bold text-[#2B2329] mb-1">
              Business Hours
            </h2>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              Monday – Saturday: 10:00 AM – 7:00 PM (IST)
            </p>
          </div>

          {/* Response Time */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-[19px] font-bold text-[#2B2329] mb-1">
              Response Time
            </h2>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              We aim to respond to all inquiries within 24–48 business hours.
            </p>
          </div>

          {/* Custom Orders */}
          <div>
            <h2 className="text-lg sm:text-[19px] font-bold text-[#2B2329] mb-1">
              Custom Orders
            </h2>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed mb-3">
              Looking for a personalized handmade creation? Contact us via email or{" "}
              <a
                href="https://instagram.com/mintedwhimsy0"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3B5998", textDecoration: "underline" }}
                className="hover:opacity-80 transition-opacity font-medium"
              >
                Instagram DM (@mintedwhimsy0)
              </a>{" "}
              with your requirements, and we&apos;ll be happy to discuss custom designs, colors, and special
              requests.
            </p>
            <p className="text-[#4F4149] text-[15px] sm:text-base leading-relaxed">
              Thank you for supporting handmade craftsmanship and choosing Minted Whimsy.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
