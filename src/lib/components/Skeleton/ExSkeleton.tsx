"use client";

import clsx from "clsx";
import type { ExSkeletonProps } from "./props/ExSkeletonProps";

export default function ExSkeleton({
  className,
  radius = "default",
  animate = true,
}: ExSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "bg-surface-4",
        radius === "full" ? "rounded-full" : "rounded-md",
        animate && "animate-pulse",
        className,
      )}
    />
  );
}