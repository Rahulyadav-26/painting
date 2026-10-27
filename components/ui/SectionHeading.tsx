import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  accentWord?: string; // word in the title to highlight with gradient
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  accentWord,
  className,
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  // Highlight a specific word in gradient
  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(accentWord);
    if (parts.length < 2) return title;
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn("flex flex-col gap-3", alignClass, className)}>
      <h2
        style={{ fontFamily: "var(--font-display)" }}
        className="text-3xl sm:text-4xl font-bold text-[#2B2B2B] leading-tight"
      >
        {renderTitle()}
      </h2>

      {/* Decorative blush line */}
      <div
        className={cn(
          "h-[3px] w-16 rounded-full",
          "bg-gradient-to-r from-[#F4B6C2] to-[#D6657E]",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )}
      />

      {subtitle && (
        <p className="text-[#7A6F6F] text-base sm:text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
