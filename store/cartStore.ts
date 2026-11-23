import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartStore, CartItem, Product, DeliveryMedium } from "@/types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1, deliveryOption: DeliveryMedium = "digital") => {
        const existing = get().items.find(
          (i) =>
            i.product.id === product.id &&
            (i.deliveryOption || "digital") === deliveryOption
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === product.id &&
              (i.deliveryOption || "digital") === deliveryOption
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity, deliveryOption }],
          }));
        }
      },

      removeItem: (productId: string, deliveryOption?: DeliveryMedium) =>
        set((state) => ({
          items: state.items.filter((i) =>
            deliveryOption
              ? !(
                  i.product.id === productId &&
                  (i.deliveryOption || "digital") === deliveryOption
                )
              : i.product.id !== productId
          ),
        })),

      updateQuantity: (
        productId: string,
        quantity: number,
        deliveryOption?: DeliveryMedium
      ) => {
        if (quantity <= 0) {
          get().removeItem(productId, deliveryOption);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => {
            const matches = deliveryOption
              ? i.product.id === productId &&
                (i.deliveryOption || "digital") === deliveryOption
              : i.product.id === productId;
            return matches ? { ...i, quantity } : i;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) =>
            sum + (i.product.salePrice ?? i.product.price) * i.quantity,
          0
        ),
    }),
    {
      name: "minted-whimsy-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
