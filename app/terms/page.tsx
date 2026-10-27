import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "Terms of Service & Privacy Policy",
  description:
    "Collector terms, artwork copyright protections, authenticity guarantees, and privacy policies for Minted Whimsy.",
};

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-12 sm:py-16">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-bold text-gray-900"
            >
              Terms of Service & Privacy
            </h1>
            <p className="text-xs text-gray-500 mt-2">Last updated: October 2026</p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-pink-100 shadow-sm space-y-8 text-xs text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                1. Authenticity & Originality Warranty
              </h2>
              <p>
                Minted Whimsy acts as the exclusive direct representative for the artists hosted
                on this website. Every artwork displayed as an "Original" is guaranteed to be a
                one-of-a-kind physical painting created solely by the credited artist. Each piece is
                accompanied by an official Certificate of Authenticity.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                2. Copyright & Intellectual Property
              </h2>
              <p>
                Purchase of an original artwork conveys ownership of the physical object only. The
                artist retains all moral rights and copyright, including reproduction and licensing
                rights. Artworks may not be commercially reproduced, merchandised, or tokenized
                without express written permission from the artist and Minted Whimsy.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                3. Order Cancellation & Returns
              </h2>
              <p>
                Collectors may return eligible original paintings within 14 calendar days of
                delivery in accordance with our Return Guarantee. Custom commissioned pieces, once
                approved and executed, are final sale.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                4. Data Protection & Collector Privacy
              </h2>
              <p>
                We do not sell, rent, or trade your contact details or collector purchase history
                to third-party advertisers. Payment card data is processed directly via PCI-DSS
                compliant gateways using 256-bit SSL encryption.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
