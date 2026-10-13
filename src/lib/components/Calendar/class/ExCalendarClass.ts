import type { ExCalendarColor, ExCalendarSize } from "../types/ExCalendarType";

export const CalendarColorClass: Record<ExCalendarColor, string> = {
  primary: "border-primary bg-primary-soft text-foreground/80",
  neutral: "ex-cal-neutral",
  success: "border-success bg-success-soft text-foreground/80",
  warning: "border-warning bg-warning-soft text-foreground/80",
  danger: "border-danger bg-danger-soft text-foreground/80",
};

export const CalendarSizeClass: Record<ExCalendarSize, { hour: number; lane: number; header: number; month: number; font: number; line: number; padding: number }> = {
  sm: { hour: 64, lane: 24, header: 32, month: 108, font: 11, line: 16, padding: 12 },
  md: { hour: 80, lane: 30, header: 36, month: 126, font: 13, line: 18, padding: 16 },
  lg: { hour: 104, lane: 36, header: 40, month: 148, font: 15, line: 21, padding: 20 },
};

export const CalendarTitleColorClass: Record<ExCalendarColor, string> = {
  primary: "text-primary", success: "text-success", warning: "text-warning", danger: "text-danger", neutral: "text-inherit",
};
