"use client";

import { useState } from "react";
import PageLoader from "@/components/ui/PageLoader";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";

export default function LoadingPreviewPage() {
  const [key, setKey] = useState(0);
  const [cyclePhrases, setCyclePhrases] = useState(false);
  const [showProgress, setShowProgress] = useState(true);

  return (
    <div className="min-h-screen relative bg-[#FFF2F5]">
      {/* Floating control dock for testing */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#FFD6E5] shadow-lg text-xs">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[#7A6F6F] hover:text-[#D6657E] font-medium transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Store
        </Link>
        <span className="text-[#FFD6E5]">|</span>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1 text-[#D6657E] hover:text-[#C2185B] font-semibold cursor-pointer"
        >
          <RotateCcw size={13} />
          Replay
        </button>
        <span className="text-[#FFD6E5]">|</span>
        <label className="flex items-center gap-1.5 text-[#7A6F6F] cursor-pointer">
          <input
            type="checkbox"
            checked={cyclePhrases}
            onChange={(e) => setCyclePhrases(e.target.checked)}
            className="accent-[#FF7096] rounded"
          />
          Art Quotes
        </label>
        <label className="flex items-center gap-1.5 text-[#7A6F6F] cursor-pointer">
          <input
            type="checkbox"
            checked={showProgress}
            onChange={(e) => setShowProgress(e.target.checked)}
            className="accent-[#FF7096] rounded"
          />
          Progress Bar
        </label>
      </div>

      {/* The Page Loader */}
      <PageLoader
        key={key}
        text="Loading cuteness..."
        cyclePhrases={cyclePhrases}
        fullscreen={true}
        showProgress={showProgress}
      />
    </div>
  );
}
