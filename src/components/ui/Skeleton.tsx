import { cn } from "@/lib/utils";
import React from "react";

/**
 * Skeleton component to show loading state
 * @param className Tailwind classes for custom width/height/shape
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-700",
        className
      )}
    />
  );
}
