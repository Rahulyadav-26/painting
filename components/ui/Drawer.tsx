"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  children: ReactNode;
  className?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  className,
}: DrawerProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  const slideVariants = {
    hidden: { x: side === "right" ? "100%" : "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: side === "right" ? "100%" : "-100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#2B2B2B]/35 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "drawer-title" : undefined}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className={cn(
              "fixed top-0 bottom-0 w-full max-w-md",
              "bg-[#FFF8F5] shadow-2xl z-50",
              "flex flex-col",
              side === "right" ? "right-0 rounded-l-2xl" : "left-0 rounded-r-2xl",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#FFE3DC] shrink-0">
              {title && (
                <h2
                  id="drawer-title"
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl font-semibold text-[#2B2B2B]"
                >
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="ml-auto p-2 rounded-full hover:bg-[#FFE3DC] text-[#7A6F6F] hover:text-[#D6657E] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
