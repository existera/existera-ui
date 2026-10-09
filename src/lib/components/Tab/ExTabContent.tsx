"use client";

import { cn } from "../../utils/Utils";
import { useTab } from "./context/ExTabContext";
import type { ExTabContentProps } from "./props/ExTabContentProps";

export default function ExTabContent({
  value,
  children,
  className,
}: ExTabContentProps) {
  const { activeTab, baseId } = useTab();

  const active = activeTab === value;

  return <div id={`${baseId}-panel-${encodeURIComponent(value)}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${encodeURIComponent(value)}`} hidden={!active} tabIndex={active ? 0 : -1} className={cn("pt-4", className)}>{active ? children : null}</div>;
}
