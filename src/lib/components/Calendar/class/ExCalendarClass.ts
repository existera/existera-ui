import type { Color } from "../../../types/Types";

export const CalendarColorClass: Record<Color, string> = {
  primary: "border-primary/60 bg-primary/15 text-foreground",
  secondary: "border-muted bg-surface-3 text-foreground",
  success: "border-success/60 bg-success/15 text-foreground",
  warning: "border-warning/60 bg-warning/15 text-foreground",
  danger: "border-danger/60 bg-danger/15 text-foreground",
};

export const CalendarSizeClass = {
  xs: { hour: 48, lane: 22, header: 30, month: 100, font: 10, padding: 10 },
  sm: { hour: 56, lane: 24, header: 32, month: 108, font: 11, padding: 12 },
  md: { hour: 64, lane: 26, header: 36, month: 112, font: 11, padding: 16 },
  lg: { hour: 80, lane: 30, header: 40, month: 132, font: 13, padding: 20 },
};
