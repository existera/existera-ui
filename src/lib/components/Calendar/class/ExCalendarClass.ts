import type { Color } from "../../../types/Types";

export const CalendarColorClass: Record<Color, string> = {
  primary: "border-primary bg-primary-soft text-foreground/80",
  secondary: "border-secondary bg-secondary-soft text-foreground/80",
  success: "border-success bg-success-soft text-foreground/80",
  warning: "border-warning bg-warning-soft text-foreground/80",
  danger: "border-danger bg-danger-soft text-foreground/80",
};

export const CalendarSizeClass = {
  xs: { hour: 48, lane: 22, header: 30, month: 100, font: 10, padding: 10 },
  sm: { hour: 56, lane: 24, header: 32, month: 108, font: 11, padding: 12 },
  md: { hour: 64, lane: 26, header: 36, month: 112, font: 11, padding: 16 },
  lg: { hour: 80, lane: 30, header: 40, month: 132, font: 13, padding: 20 },
};
