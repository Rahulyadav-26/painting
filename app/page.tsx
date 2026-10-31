"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import WhimsicalHero from "@/components/home/WhimsicalHero";
import WhimsicalAbout from "@/components/home/WhimsicalAbout";
import WhimsicalProducts from "@/components/home/WhimsicalProducts";
import DailyPlannerSection from "@/components/home/DailyPlannerSection";
import WhimsicalProcess from "@/components/home/WhimsicalProcess";
import WhimsicalTestimonials from "@/components/home/WhimsicalTestimonials";
import WhimsicalPromoBanners from "@/components/home/WhimsicalPromoBanners";
import WhimsicalContact from "@/components/home/WhimsicalContact";
import QuickViewModal from "@/components/product/QuickViewModal";
import type { Product } from "@/types";

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <MainLayout>
      {/* 1. Whimsical Hero: "Whimsical art for dreamers & kind hearts" */}
      <WhimsicalHero />

      {/* 2. About Atelier: "Artist. Storyteller. Daydreamer." */}
      <WhimsicalAbout />

      {/* 3. Our Products: Planner, Notes, Stickers, Coloring pages */}
      <WhimsicalProducts />

      {/* 4. Autumn Harvest Digital Daily Planner Spotlight & Mockup Showcase */}
      <DailyPlannerSection />

      {/* 5. Creative Process: "From idea to magic ♡" */}
      <WhimsicalProcess />

      {/* 6. Kind Words: "What lovely people say ♡" */}
      <WhimsicalTestimonials />

      {/* 7. Dual Promo Banners: Digital & Print highlights */}
      <WhimsicalPromoBanners />

      {/* 8. Get in Touch: "Let's stay in touch! ♡" with contact form */}
      <WhimsicalContact />

      {/* Quick View Canvas Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </MainLayout>
  );
}
