"use client";

import { cn } from "../../utils/Utils";
import { PrefixSizeClass, PrefixRadiusSizeClass, PrefixTextareaSizeClass } from "./class/ExPrefixClass";
import type { ExPrefixProps } from "./props/ExPrefixProps";

export default function ExPrefix({ textarea = false, size = "md", radius = "default", children }: ExPrefixProps) {
  return (
    <div
      className={cn(
        textarea ? PrefixTextareaSizeClass[size] : PrefixSizeClass[size],
        PrefixRadiusSizeClass[size][radius],
        "flex h-full border-r border-field-border bg-surface-2 text-muted whitespace-nowrap",
      )}
      style={{ height: "stretch" }}>
      {children}
    </div>
  );
}
