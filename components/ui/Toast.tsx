"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToastStore } from "@/store/toastStore";
import type { ToastVariant } from "@/types";
import { cn } from "@/lib/utils";

const config: Record<
  ToastVariant,
  { icon: typeof CheckCircle; bg: string; border: string; text: string }
> = {
  success: {
    icon: CheckCircle,
    bg: "bg-[#F0FBF5]",
    border: "border-[#3FA66B]/30",
    text: "text-[#3FA66B]",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-[#FEF2F2]",
    border: "border-[#E05454]/30",
    text: "text-[#E05454]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[#FFFBEB]",
    border: "border-[#F5A623]/30",
    text: "text-[#F5A623]",
  },
  info: {
    icon: Info,
    bg: "bg-[#EFF6FF]",
    border: "border-[#4A90D9]/30",
    text: "text-[#4A90D9]",
  },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const { icon: Icon, bg, border, text } = config[toast.variant];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 32, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              role="alert"
              className={cn(
                "pointer-events-auto",
                "flex items-start gap-3",
                "w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm",
                "rounded-2xl border px-4 py-3",
                "shadow-[0_4px_24px_rgba(43,43,43,0.12)]",
                bg,
                border
              )}
            >
              <Icon size={18} className={cn("shrink-0 mt-0.5", text)} />
              <p className="flex-1 text-[#2B2B2B] text-sm leading-snug">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
                className="shrink-0 p-0.5 rounded-full text-[#7A6F6F] hover:text-[#2B2B2B] transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
