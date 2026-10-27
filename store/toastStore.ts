import { create } from "zustand";
import type { ToastStore, ToastVariant } from "@/types";

export const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],

  addToast: (message: string, variant: ToastVariant = "success") => {
    const id = Math.random().toString(36).slice(2);
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant }],
    }));
    // Auto-remove after 3.5 s
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3500);
  },

  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
