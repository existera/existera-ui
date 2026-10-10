import { createContext, useContext } from "react";
import type { ExTreeViewSize } from "../types/ExTreeViewType";

export const ExTreeViewContext = createContext<{
  size: ExTreeViewSize;
  selected: string | null;
  select: (id: string) => void;
} | null>(null);

export function useTreeView() {
  const context = useContext(ExTreeViewContext);
  if (!context) throw new Error("ExTreeViewItem must be used inside ExTreeView");
  return context;
}
