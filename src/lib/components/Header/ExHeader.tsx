"use client";

import { cn } from "../../utils/Utils";
import type { ExHeaderProps } from "./props/ExHeaderProps";

export default function ExHeader({ children, className }: ExHeaderProps) {
  return (
    <header
      className={cn(
        "p-4 text-xl font-semibold leading-tight",
        className,
      )}
    >
      {children}
    </header>
  );
}