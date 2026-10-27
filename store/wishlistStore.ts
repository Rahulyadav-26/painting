import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { WishlistStore } from "@/types";

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (productId: string) => {
        const has = get().ids.includes(productId);
        set((state) => ({
          ids: has
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        }));
      },

      has: (productId: string) => get().ids.includes(productId),
    }),
    {
      name: "minted-whimsy-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
