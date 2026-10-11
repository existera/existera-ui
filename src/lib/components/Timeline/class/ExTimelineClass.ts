import type { ExTimelineColor, ExTimelineSize } from "../types/ExTimelineType";

export const TimelineSizeClass: Record<ExTimelineSize, { diameter: string; marker: string; title: string; body: string; spacing: string }> =
  {
    xs: { diameter: "20px", marker: "size-5 [&>svg]:size-3", title: "text-xs", body: "text-[10px]", spacing: "pb-5" },
    sm: { diameter: "24px", marker: "size-6 [&>svg]:size-3.5", title: "text-sm", body: "text-xs", spacing: "pb-6" },
    md: { diameter: "32px", marker: "size-8 [&>svg]:size-4", title: "text-sm", body: "text-xs", spacing: "pb-8" },
    lg: { diameter: "40px", marker: "size-10 [&>svg]:size-5", title: "text-base", body: "text-sm", spacing: "pb-10" },
  };

export const TimelineColorClass: Record<ExTimelineColor, string> = {
  primary: "border-primary/30 bg-primary/10 text-primary",
  secondary: "border-border bg-surface-2 text-foreground",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/30 bg-danger/10 text-danger",
};
