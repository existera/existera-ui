import type { ExKanbanColor, ExKanbanSize } from "../types/ExKanbanType";

export const KanbanSizeClass: Record<ExKanbanSize, { width: string; padding: string; title: string }> = {
  sm: { width: "w-64", padding: "p-3", title: "text-xs" },
  md: { width: "w-80", padding: "p-4", title: "text-sm" },
  lg: { width: "w-96", padding: "p-5", title: "text-base" },
};
export const KanbanColorClass: Record<ExKanbanColor, string> = {
  neutral: "bg-foreground",
  primary: "bg-primary-solid",
  success: "bg-success-solid",
  warning: "bg-warning-solid",
  danger: "bg-danger-solid",
};
export const KanbanPriorityClass = {
  low: "bg-surface-3 text-muted",
  medium: "bg-warning-soft text-warning",
  high: "bg-danger-soft text-danger",
};
