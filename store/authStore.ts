"use client";

import { create } from "zustand";
import type { AuthState, AuthUser } from "@/types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      const data = await res.json();
      if (data.authenticated && data.user) {
        set({ user: data.user, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (err) {
      console.error("Failed to check auth:", err);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Failed to sign in" };
      }

      set({ user: data.user, isAuthenticated: true });
      return { success: true };
    } catch (err) {
      return { success: false, error: "Network error. Please try again." };
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Failed to create account" };
      }

      set({ user: data.user, isAuthenticated: true });
      return { success: true };
    } catch (err) {
      return { success: false, error: "Network error. Please try again." };
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
