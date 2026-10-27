import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    title: "Blushing Peonies",
    slug: "blushing-peonies",
    artist: "Priya Nair",
    category: "Floral",
    medium: "Oil on Canvas",
    size: "16×20 in",
    price: 8500,
    isNew: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop",
    ],
    description:
      "A lush, intimate study of peonies in full bloom, captured in thick oil strokes that give the petals a velvet-like warmth. Signed and varnished, ready to hang.",
    tags: ["peonies", "flowers", "pink", "romantic"],
    rating: 4.9,
    reviewCount: 34,
  },
  {
    id: "2",
    title: "Amber Dusk",
    slug: "amber-dusk",
    artist: "Arjun Mehta",
    category: "Landscape",
    medium: "Watercolour",
    size: "12×16 in",
    price: 5200,
    salePrice: 3900,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop",
    ],
    description:
      "Golden hour washed over rolling hills — a meditative watercolour study on 300gsm cold-press paper. Soft edges and luminous washes evoke quiet summer evenings.",
    tags: ["sunset", "landscape", "golden", "hills"],
    rating: 4.7,
    reviewCount: 18,
  },
  {
    id: "3",
    title: "Monsoon Reverie",
    slug: "monsoon-reverie",
    artist: "Shreya Kaul",
    category: "Abstract",
    medium: "Acrylic",
    size: "24×36 in",
    price: 14200,
    isNew: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop",
    ],
    description:
      "Deep indigos and rainy-day greys swirl across a large-format canvas — feel the petrichor and the patter of the first monsoon rain through pure colour.",
    tags: ["abstract", "monsoon", "blue", "rain", "large"],
    rating: 5.0,
    reviewCount: 12,
  },
  {
    id: "4",
    title: "The Old Banyan",
    slug: "the-old-banyan",
    artist: "Vikram Rao",
    category: "Landscape",
    medium: "Oil on Canvas",
    size: "18×24 in",
    price: 11000,
    salePrice: 8800,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&auto=format&fit=crop",
    ],
    description:
      "An ancient banyan commands the canvas — its aerial roots and dappled light rendered in layered oil, speaking of permanence amid a changing world.",
    tags: ["tree", "nature", "green", "heritage"],
    rating: 4.8,
    reviewCount: 26,
  },
  {
    id: "5",
    title: "Festival of Lights",
    slug: "festival-of-lights",
    artist: "Ananya Singh",
    category: "Cityscape",
    medium: "Acrylic",
    size: "16×20 in",
    price: 7600,
    isNew: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop",
    ],
    description:
      "Diyas, bokeh lights, and celebratory colours leap off the canvas — this vibrant acrylic piece captures the magic of Diwali night in joyful detail.",
    tags: ["diwali", "festival", "lights", "india", "celebration"],
    rating: 4.9,
    reviewCount: 41,
  },
  {
    id: "6",
    title: "Himalayan Silence",
    slug: "himalayan-silence",
    artist: "Arjun Mehta",
    category: "Landscape",
    medium: "Watercolour",
    size: "A3 (30×42 cm)",
    price: 6400,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
    ],
    description:
      "Snow-capped peaks emerge through morning mist in this serene watercolour. Minimal strokes convey maximum altitude and majesty.",
    tags: ["himalaya", "snow", "mountains", "blue", "serene"],
    rating: 4.6,
    reviewCount: 15,
  },
  {
    id: "7",
    title: "Saffron Sari",
    slug: "saffron-sari",
    artist: "Priya Nair",
    category: "Portrait",
    medium: "Gouache",
    size: "A4 (21×30 cm)",
    price: 4800,
    isNew: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop",
    ],
    description:
      "A graceful portrait study in gouache — vibrant saffron sari against warm terracotta tones celebrate the beauty of everyday Indian femininity.",
    tags: ["portrait", "sari", "woman", "india", "gouache"],
    rating: 4.8,
    reviewCount: 22,
  },
  {
    id: "8",
    title: "Coral Reef Dream",
    slug: "coral-reef-dream",
    artist: "Shreya Kaul",
    category: "Abstract",
    medium: "Mixed Media",
    size: "12×16 in",
    price: 5900,
    salePrice: 4700,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&auto=format&fit=crop",
    ],
    description:
      "Layers of resin, acrylic, and iridescent pigment replicate the luminous mystery of a coral reef — a conversation between art and the ocean.",
    tags: ["ocean", "coral", "blue", "turquoise", "abstract"],
    rating: 4.7,
    reviewCount: 19,
  },
  {
    id: "9",
    title: "Morning Chai",
    slug: "morning-chai",
    artist: "Vikram Rao",
    category: "Still Life",
    medium: "Oil on Canvas",
    size: "8×10 in",
    price: 3200,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&auto=format&fit=crop",
    ],
    description:
      "A small, intimate oil painting of a kulhad chai on a wooden table — morning light, steam, warmth. Perfect for a kitchen or reading nook.",
    tags: ["chai", "still life", "kitchen", "warm", "india"],
    rating: 4.9,
    reviewCount: 57,
  },
  {
    id: "10",
    title: "Peacock in Bloom",
    slug: "peacock-in-bloom",
    artist: "Ananya Singh",
    category: "Wildlife",
    medium: "Acrylic",
    size: "18×24 in",
    price: 9800,
    isNew: false,
    inStock: false,
    images: [
      "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555169062-013468b47731?w=800&auto=format&fit=crop",
    ],
    description:
      "A majestic peacock fans his tail among rain-washed blossoms — jewel tones and precise feather-work make this piece a statement in any room.",
    tags: ["peacock", "bird", "blue", "green", "wildlife"],
    rating: 4.8,
    reviewCount: 31,
  },
  {
    id: "11",
    title: "Sacred Lotus",
    slug: "sacred-lotus",
    artist: "Priya Nair",
    category: "Spiritual",
    medium: "Watercolour",
    size: "A4 (21×30 cm)",
    price: 4200,
    isNew: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop",
    ],
    description:
      "Soft blush and ivory petals rise from still water — the lotus rendered in translucent watercolour layers. A symbol of grace for any sacred space.",
    tags: ["lotus", "spiritual", "pink", "meditation", "zen"],
    rating: 5.0,
    reviewCount: 48,
  },
  {
    id: "12",
    title: "Midnight Tigers",
    slug: "midnight-tigers",
    artist: "Vikram Rao",
    category: "Wildlife",
    medium: "Ink",
    size: "A3 (30×42 cm)",
    price: 6800,
    salePrice: 5400,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop",
    ],
    description:
      "Dramatic ink-wash tigers vanish into darkness — bold contrasts and fluid brushwork in traditional sumi-e style, yet unmistakably contemporary.",
    tags: ["tiger", "ink", "black", "wildlife", "dramatic"],
    rating: 4.7,
    reviewCount: 23,
  },
  {
    id: "13",
    title: "Lavender Fields",
    slug: "lavender-fields",
    artist: "Shreya Kaul",
    category: "Landscape",
    medium: "Pastel",
    size: "12×16 in",
    price: 5600,
    isNew: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&auto=format&fit=crop",
    ],
    description:
      "Rows of lavender stretch to the horizon under a blush-rose sky — soft pastel marks capture the gentle sway and fragrance of Provence.",
    tags: ["lavender", "purple", "landscape", "france", "romantic"],
    rating: 4.8,
    reviewCount: 29,
  },
  {
    id: "14",
    title: "Golden Ganesha",
    slug: "golden-ganesha",
    artist: "Ananya Singh",
    category: "Spiritual",
    medium: "Acrylic",
    size: "16×20 in",
    price: 8900,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop",
    ],
    description:
      "Ganesha in luminous gold leaf and vibrant acrylics — ornate, celebratory, and spiritually uplifting. A statement piece for your puja room or living area.",
    tags: ["ganesha", "gold", "spiritual", "india", "festival"],
    rating: 4.9,
    reviewCount: 63,
  },
  {
    id: "15",
    title: "Rain on Glass",
    slug: "rain-on-glass",
    artist: "Arjun Mehta",
    category: "Abstract",
    medium: "Mixed Media",
    size: "30×40 in",
    price: 18500,
    isNew: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515266591878-f93e32bc5937?w=800&auto=format&fit=crop",
    ],
    description:
      "Resin rivers and fluid acrylics cascade across a grand canvas, evoking rain streaks on a city window at dusk. A large-format showstopper.",
    tags: ["rain", "abstract", "large", "resin", "blue"],
    rating: 4.9,
    reviewCount: 9,
  },
  {
    id: "16",
    title: "Wildflower Meadow",
    slug: "wildflower-meadow",
    artist: "Priya Nair",
    category: "Floral",
    medium: "Watercolour",
    size: "A3 (30×42 cm)",
    price: 6200,
    salePrice: 4900,
    isNew: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop",
    ],
    description:
      "A free-flowing wildflower meadow — daisies, cornflowers, poppies — painted in joyful watercolour washes that feel spontaneous and alive.",
    tags: ["wildflowers", "meadow", "summer", "colourful", "botanical"],
    rating: 4.8,
    reviewCount: 38,
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.isNew && p.inStock).slice(0, 6);

export const getNewArrivals = (): Product[] =>
  products.filter((p) => p.isNew).slice(0, 4);

export const getSaleProducts = (): Product[] =>
  products.filter((p) => p.salePrice !== undefined);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

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
