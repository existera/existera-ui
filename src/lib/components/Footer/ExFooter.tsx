"use client";

import { cn } from "../../utils/Utils";
import type { ExFooterProps } from "./props/ExFooterProps";

export default function ExFooter({ children, className }: ExFooterProps) {
  return (
    <footer
      className={cn(
        "mt-auto flex items-center justify-end gap-2 p-4 bg-surface-2",
        className,
      )}
    >
      {children}
    </footer>
  );
}