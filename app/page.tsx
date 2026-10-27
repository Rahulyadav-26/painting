"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CuratorSpotlight from "@/components/home/CuratorSpotlight";
import CategoryGrid from "@/components/home/CategoryGrid";
import ShopByPrice from "@/components/home/ShopByPrice";
import AllProductsSection from "@/components/home/AllProductsSection";
import PerksBar from "@/components/home/PerksBar";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import QuickViewModal from "@/components/product/QuickViewModal";
import type { Product } from "@/types";

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <MainLayout>
      {/* 1. Grand Editorial Hero: Where Rare Artistry Meets Whimsical Living */}
      <HeroSection />

      {/* 2. Curated New Acquisitions: Filterable paintings with provenance badges */}
      <FeaturedProducts onQuickView={setQuickViewProduct} />

      {/* 3. Curator's Atelier: The craft of mineral pigments & Belgian linen */}
      <CuratorSpotlight />

      {/* 4. Explore by Artistic Genre: Visual art movement collections */}
      <CategoryGrid />

      {/* 5. Acquire by Collector Tier: Thoughtful art advisory pricing */}
      <ShopByPrice />

      {/* 6. The Collector's Archive: Full original paintings gallery */}
      <AllProductsSection onQuickView={setQuickViewProduct} />

      {/* 7. Studio Perks & Collector Assurance */}
      <PerksBar />

      {/* 8. Collector Testimonials */}
      <TestimonialsSection />

      {/* 9. VIP Art Salon Newsletter */}
      <NewsletterSection />

      {/* Quick View Canvas Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </MainLayout>
  );
}
