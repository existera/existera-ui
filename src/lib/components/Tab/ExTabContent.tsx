"use client";

import { cn } from "../../utils/Utils";
import { useTab } from "./context/ExTabContext";
import type { ExTabContentProps } from "./props/ExTabContentProps";

export default function ExTabContent({
  value,
  children,
  className,
}: ExTabContentProps) {
  const { activeTab } = useTab();

  if (activeTab !== value) return null;

  return <div className={cn("pt-4", className)}>{children}</div>;
}
