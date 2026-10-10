"use client";

import { Children, isValidElement, useId, useState, type ReactNode } from "react";
import ExTabItem from "./ExTabItem";
import { TabContext } from "./context/ExTabContext";
import type { ExTabProps } from "./props/ExTabProps";
import { cn } from "../../utils/Utils";

export default function ExTab({
  value,
  defaultValue = "",
  onValueChange,
  children,
  className,
}: ExTabProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const baseId = useId();
  const enabled: string[] = [];
  const collect = (nodes: ReactNode) => Children.forEach(nodes, child => {
    if (!isValidElement<{ value?: string; disabled?: boolean; children?: ReactNode }>(child)) return;
    if (child.type === ExTabItem && !child.props.disabled && child.props.value !== undefined) enabled.push(child.props.value);
    else if (child.type !== ExTab) collect(child.props.children);
  });
  collect(children);
  const activeTab = value !== undefined ? value : enabled.includes(internalValue) ? internalValue : enabled[0] ?? "";

  const setActiveTab = (tab: string) => {
    if (value === undefined) {
      setInternalValue(tab);
    }

    onValueChange?.(tab);
  };

  return (
    <TabContext.Provider
      value={{
        activeTab,
        baseId,
        setActiveTab,
      }}
    >
      <div className={cn("w-full min-w-0", className)}>{children}</div>
    </TabContext.Provider>
  );
}
