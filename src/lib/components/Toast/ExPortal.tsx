"use client";

import { createPortal } from "react-dom";
import type { ReactNode } from "react";

export interface ExPortalProps {
  children: ReactNode;
  container?: Element;
}

export default function ExPortal({ children, container }: ExPortalProps) {
  const target =
    container ?? (typeof document !== "undefined" ? document.body : null);
  if (!target) {
    return null;
  }
  return createPortal(children, target);
}
