"use client";

import type { ReactNode } from "react";
import { cn } from "../../utils/Utils";

export default function ExTableCell({
  textAlign = "left",
  children,
}: {
  textAlign?: "left" | "right";
  children?: ReactNode;
}) {
  return (
    <td
      scope="col"
      className={cn(
        textAlign === "left" ? "text-left" : "text-right",
        "px-3 py-2 align-top",
      )}
    >
      {children}
    </td>
  );
}