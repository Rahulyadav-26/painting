import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  const roundedClass = {
    sm: "rounded",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={cn("skeleton", roundedClass, className)}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton className="w-full h-64" rounded="lg" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-3 w-20" rounded="full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-24" rounded="full" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full min-h-[80dvh] skeleton rounded-none" />
  );
}
