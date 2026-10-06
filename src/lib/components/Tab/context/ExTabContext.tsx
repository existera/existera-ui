import { createContext, useContext } from "react";

export type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const TabContext = createContext<TabContextType | null>(null);

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("ExTab must be used inside ExTab");
  return ctx;
}
