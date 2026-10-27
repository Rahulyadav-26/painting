"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getSaleProducts } from "@/data/products";
import { formatPrice, discountPercent } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";

const saleProducts = getSaleProducts();

export default function SaleSection() {
  if (saleProducts.length === 0) return null;

  return (
    <section className="py-20 bg-[#FFE3DC]/40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title="On Sale Now"
            subtitle="Original artworks at special prices — don't miss out on these limited-time offers."
            accentWord="Sale"
            align="center"
          />
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {saleProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={`/product/${product.slug}`}
                className="card group flex flex-col overflow-hidden block"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Sale ribbon */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="sale"
                      price={product.price}
                      salePrice={product.salePrice!}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="font-semibold text-[#2B2B2B] text-sm leading-tight mb-1"
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#7A6F6F] mb-3">by {product.artist}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[#D6657E]">
                      {formatPrice(product.salePrice!)}
                    </span>
                    <span className="text-sm text-[#7A6F6F] line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="ml-auto text-[10px] font-bold text-[#3FA66B] bg-[#3FA66B]/10 rounded-full px-2 py-0.5">
                      Save {discountPercent(product.price, product.salePrice!)}%
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
