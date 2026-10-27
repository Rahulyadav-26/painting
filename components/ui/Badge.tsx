import { cn } from "@/lib/utils";
import { discountPercent } from "@/lib/utils";
import type { BadgeVariant } from "@/types";

interface BadgeProps {
  variant: BadgeVariant;
  price?: number;
  salePrice?: number;
  label?: string;
  className?: string;
}

const variantConfig: Record<
  BadgeVariant,
  { label: string; style: string }
> = {
  new: {
    label: "New",
    style: "bg-[#D6657E] text-white",
  },
  sale: {
    label: "Sale",
    style: "bg-[#F5A623] text-white",
  },
  sold: {
    label: "Sold Out",
    style: "bg-[#7A6F6F] text-white",
  },
  hot: {
    label: "Hot",
    style: "bg-[#3FA66B] text-white",
  },
};

export default function Badge({
  variant,
  price,
  salePrice,
  label,
  className,
}: BadgeProps) {
  const config = variantConfig[variant];
  const displayLabel =
    label ??
    (variant === "sale" && price && salePrice
      ? `−${discountPercent(price, salePrice)}%`
      : config.label);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full px-2.5 py-0.5",
        "text-xs font-semibold tracking-wide",
        "leading-none select-none",
        "shadow-sm",
        config.style,
        className
      )}
    >
      {displayLabel}
    </span>
  );
}
