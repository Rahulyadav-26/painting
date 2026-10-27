"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import PageLoader from "@/components/ui/PageLoader";

export default function PageLoadingOverlay() {
  const pathname = usePathname();
  // Always active on initial page mount or reload
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);

  const isInitialMount = useRef(true);
  const isPreview = pathname === "/loading-preview";

  const handleComplete = useCallback(() => {
    // Gracefully fade out after reaching 100%
    setLoading(false);
  }, []);

  // 1. Listen for route changes (navigation between pages)
  useEffect(() => {
    if (isPreview) {
      setLoading(false);
      return;
    }

    // Skip incrementing on initial mount because initial state already loads it
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setLoading(true);
    setKey((prev) => prev + 1);
  }, [pathname, isPreview]);

  // 2. Intercept internal link clicks for immediate responsive feedback
  useEffect(() => {
    if (isPreview) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/loading-preview") &&
        target.target !== "_blank";

      const isSamePageHash = href.startsWith("#") || href.startsWith(pathname + "#");

      if (isInternal && !isSamePageHash && href !== pathname) {
        setLoading(true);
        setKey((prev) => prev + 1);
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [pathname, isPreview]);

  // 3. Listen for manual trigger events from buttons or scripts
  useEffect(() => {
    const handleManualTrigger = () => {
      setLoading(true);
      setKey((prev) => prev + 1);
    };

    window.addEventListener("mw:trigger-loader", handleManualTrigger);
    return () => window.removeEventListener("mw:trigger-loader", handleManualTrigger);
  }, []);

  if (isPreview) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <PageLoader
          key={`global-page-loader-${key}`}
          text="Loading cuteness..."
          cyclePhrases={false}
          fullscreen={true}
          showProgress={true}
          onComplete={handleComplete}
        />
      )}
    </AnimatePresence>
  );
}

/** Helper function to manually trigger the cute loading effect from anywhere */
export function triggerPageLoader() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("mw:trigger-loader"));
  }
}
