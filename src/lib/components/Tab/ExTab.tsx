"use client";

import { useState } from "react";
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

  const activeTab = value !== undefined ? value : internalValue;

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
        setActiveTab,
      }}
    >
      <div className={cn("w-full min-w-0", className)}>{children}</div>
    </TabContext.Provider>
  );
}
