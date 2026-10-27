"use client";

import { triggerPageLoader } from "@/components/ui/PageLoadingOverlay";
import { Sparkles } from "lucide-react";

export default function PreviewLoaderButton() {
  return (
    <button
      type="button"
      onClick={() => triggerPageLoader()}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#FFA0B4] hover:text-white bg-white/5 hover:bg-[#FF7096] border border-[#FF7096]/40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(255,112,150,0.4)] active:scale-95"
      title="Click to preview the whimsical page loading effect"
    >
      <Sparkles size={13} className="text-[#FF7096] group-hover:text-white animate-pulse" />
      <span>Preview Cute Loading Effect</span>
    </button>
  );
}
