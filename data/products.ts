import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    title: "Autumn Harvest Digital Daily Planner",
    slug: "autumn-harvest-digital-daily-planner",
    artist: "Minted Whimsy Atelier",
    category: "Daily Planner",
    medium: "Digital Printable / Tablet PDF",
    size: "Digital (A4 / US Letter / Tablet)",
    price: 9,
    salePrice: 1,
    isNew: true,
    inStock: true,
    isComingSoon: false,
    images: [
      "/images/products/autumn-daily-planner-aesthetic-flatlay.jpg",
      "/images/products/autumn-daily-planner-tablet-stand-mockup.jpg",
      "/images/products/autumn-daily-planner-phone-mockup.jpg",
      "/images/products/autumn-daily-planner-original.jpg",
    ],
    description: `Autumn Harvest Digital Daily Planner
Whether you are organizing your daily hustle, tracking your wellness goals, or just slowing down to enjoy the autumn vibes, this template has everything you need in one beautifully cohesive layout.

What's Inside:
Today's Schedule: Hourly time-blocking slots
To-Do List 
Top Priority
Today's Meal Planner
Water Intake Tracker
Selfcare Tracker: 
Notes Section
Daily Inspiration: A sweet motivational quote

Product Details:
WATERMARK FREE PLANNER
Format: High-resolution digital file (instant download)
Compatibility: Print at home, use on your tablet via annotation apps (like GoodNotes or Notability), or set as a desktop wallpaper.`,
    tags: [
      "daily planner",
      "digital planner",
      "planner",
      "autumn harvest",
      "goodnotes",
      "notability",
      "printable",
      "wellness",
      "productivity",
      "fall aesthetic",
    ],
    rating: 5.0,
    reviewCount: 48,
  },
  {
    id: "2",
    title: "Cozy Whimsical Digital Note Sheets",
    slug: "cozy-whimsical-digital-note-sheets",
    artist: "Minted Whimsy Atelier",
    category: "Notes",
    medium: "Digital Printable / Tablet PDF",
    size: "Digital (A4 / US Letter / Tablet)",
    price: 6,
    salePrice: 4,
    isNew: true,
    inStock: false,
    isComingSoon: true,
    images: [
      "/images/products/cozy-whimsical-notes-mockup.jpg",
    ],
    description: `Cozy Whimsical Digital Note Sheets & Notepad Stationery
Bring warmth and magic to your study sessions, journal entries, and creative brainstorms! Includes beautifully styled lined, dotted, and grid templates with sweet hand-drawn bunny and floral borders.

What's Inside:
• 3 Whimsical Note Page Designs: Lined Doodles, Dreamy Ideas Grid, and Notes & Whimsy Journal page
• Soft pastel palette designed for comfortable day and night note-taking
• High-resolution PDF files compatible with GoodNotes, Notability, and home printing.`,
    tags: ["notes", "notepad", "goodnotes", "stationery", "digital paper", "cozy journaling"],
    rating: 4.9,
    reviewCount: 32,
  },
  {
    id: "3",
    title: "Fairytale Woodland Digital & Printable Sticker Pack",
    slug: "fairytale-woodland-sticker-pack",
    artist: "Minted Whimsy Atelier",
    category: "Stickers",
    medium: "Digital Printable / Tablet PDF",
    size: "Digital (A4 / US Letter / Tablet)",
    price: 5,
    salePrice: 3,
    isNew: true,
    inStock: false,
    isComingSoon: true,
    images: [
      "/images/products/woodland-stickers-mockup.jpg",
    ],
    description: `Fairytale Woodland Digital & Printable Sticker Pack
An enchanting collection of hand-painted watercolor stickers featuring cozy bunnies, floral tea cups, magic mushrooms, starry crescents, and heartfelt phrases.

What's Inside:
• 45+ Individual transparent pre-cropped PNG digital stickers for GoodNotes and digital journals
• Ready-to-print full sticker sheet (PDF + PNG) with die-cut outlines for Cricut or scissors
• Instant download with unlimited personal usage!`,
    tags: ["stickers", "digital stickers", "goodnotes stickers", "woodland", "cute bunnies", "watercolor"],
    rating: 5.0,
    reviewCount: 64,
  },
  {
    id: "4",
    title: "Fairytale Forest Printable Coloring Pages",
    slug: "fairytale-forest-printable-coloring-pages",
    artist: "Minted Whimsy Atelier",
    category: "Coloring pages",
    medium: "Digital Printable / Tablet PDF",
    size: "Digital (A4 / US Letter / Tablet)",
    price: 6,
    salePrice: 4,
    isNew: true,
    inStock: false,
    isComingSoon: true,
    images: [
      "/images/products/fairytale-coloring-pages-mockup.jpg",
    ],
    description: `Fairytale Forest Printable Coloring Book Pages
Unwind and spark your creativity with 15 storybook coloring pages filled with cozy woodland cottages, friendly forest creatures, whimsical gardens, and magical starry nights.

What's Inside:
• 15 High-resolution line art illustrations (300 DPI)
• Print-ready A4 & US Letter format for colored pencils, watercolours, or markers
• High-res transparent PNGs included for digital coloring in Procreate or tablet apps.`,
    tags: ["coloring pages", "coloring book", "printable coloring", "cottagecore", "relaxing", "fairytale"],
    rating: 4.9,
    reviewCount: 41,
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.isNew && p.inStock).slice(0, 6);

export const getNewArrivals = (): Product[] =>
  products.filter((p) => p.isNew).slice(0, 4);

export const getSaleProducts = (): Product[] =>
  products.filter((p) => p.salePrice !== undefined);

export const getDailyPlanners = (): Product[] =>
  products.filter((p) => p.category === "Daily Planner" || p.category === "Planner");

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug || (slug === "blushing-peonies" && p.id === "1"));

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);

export const getRelatedProducts = (
  product: Product,
  limit = 4
): Product[] =>
  products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.artist === product.artist)
    )
    .slice(0, limit);
