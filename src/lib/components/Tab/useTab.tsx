import { createContext, useContext } from "react";
import type { TabContextType } from "./types/ExTabType";

export const TabContext = createContext<TabContextType | null>(null);

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("ExTab must be used inside ExTab");
  return ctx;
}
