import type { ExTreeViewSize } from "../types/ExTreeViewType";

export const TreeViewSizeClass: Record<ExTreeViewSize, string> = {
  xs: "min-h-6 px-2 py-1 text-xs gap-1",
  sm: "min-h-7 px-2 py-1 text-sm gap-1.5",
  md: "min-h-8 px-2.5 py-1.5 text-sm gap-2",
  lg: "min-h-10 px-3 py-2 text-base gap-2.5",
};

export const TreeViewTotalSizeClass: Record<ExTreeViewSize, string> = {
  xs: "min-h-4 min-w-4 px-0.5 text-[10px]",
  sm: "min-h-4.5 min-w-4.5 px-0.5 text-[11px]",
  md: "min-h-5 min-w-5 px-1 text-xs",
  lg: "min-h-6 min-w-6 px-1 text-sm",
};
