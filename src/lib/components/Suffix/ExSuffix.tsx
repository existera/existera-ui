"use client";

import { cn } from "../../utils/Utils";
import {
    SuffixRadiusSizeClass,
  SuffixSizeClass,
  SuffixTextareaSizeClass,
} from "./class/ExSuffixClass";
import type { ESuffixProps } from "./props/ExSuffixProps";

export default function ExSuffix({
  textarea = false,
  size = "md",
  radius = "default",
  children,
}: ESuffixProps) {
  return (
    <div
      className={cn(
        textarea ? SuffixTextareaSizeClass[size] : SuffixSizeClass[size],
        SuffixRadiusSizeClass[size][radius],
        "flex h-full border-l border-border bg-surface-2 whitespace-nowrap",
      )}
      style={{ height: "stretch" }}
    >
      {children}
    </div>
  );
}
