"use client";

import PageLoader from "@/components/ui/PageLoader";

export default function Loading() {
  return (
    <PageLoader
      text="Loading cuteness..."
      cyclePhrases={false}
      fullscreen={true}
      showProgress={true}
    />
  );
}
