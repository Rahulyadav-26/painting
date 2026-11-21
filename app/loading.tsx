export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF9F6]/80 backdrop-blur-xs">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-pink-200 border-t-[#FF7096] animate-spin" />
        <p className="text-xs font-semibold text-[#8A5A65] tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}
