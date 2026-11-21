"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import PageLoader from "@/components/ui/PageLoader";

export default function PageLoadingOverlay() {
  const pathname = usePathname();
  // Disabled by default on initial mount and reload so pages load instantly
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  const isPreview = pathname === "/loading-preview";

  const handleComplete = useCallback(() => {
    // Gracefully fade out after reaching 100%
    setLoading(false);
  }, []);

  // Listen for manual trigger events (e.g. from the preview button in footer)
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
