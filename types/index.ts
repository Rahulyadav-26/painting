// ─── Product Types ──────────────────────────────────────────────────────────

export type ProductCategory =
  | "Abstract"
  | "Landscape"
  | "Portrait"
  | "Floral"
  | "Wildlife"
  | "Cityscape"
  | "Still Life"
  | "Spiritual";

export type ProductMedium =
  | "Oil on Canvas"
  | "Watercolour"
  | "Acrylic"
  | "Gouache"
  | "Pastel"
  | "Ink"
  | "Mixed Media";

export type ProductSize =
  | "A4 (21×30 cm)"
  | "A3 (30×42 cm)"
  | "8×10 in"
  | "12×16 in"
  | "16×20 in"
  | "18×24 in"
  | "24×36 in"
  | "30×40 in";

export interface Product {
  id: string;
  title: string;
  slug: string;
  artist: string;
  category: ProductCategory;
  medium: ProductMedium;
  size: ProductSize;
  price: number;
  salePrice?: number;
  isNew: boolean;
  inStock: boolean;
  images: string[];
  description: string;
  tags: string[];
  rating: number;
  reviewCount: number;
}

// ─── Cart / Wishlist Types ───────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export interface WishlistStore {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

// ─── Toast Types ─────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

export interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
}

// ─── Misc UI Types ───────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant = "new" | "sale" | "sold" | "hot";
