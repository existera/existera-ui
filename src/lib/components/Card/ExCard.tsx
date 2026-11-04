"use client";

import clsx from "clsx";
import type { ExCardProps } from "./props/ExCardProps";

export default function ExCard({ children, className }: ExCardProps) {
  return (
    <section
      className={clsx(
        "w-full rounded-lg border border-border bg-surface p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}