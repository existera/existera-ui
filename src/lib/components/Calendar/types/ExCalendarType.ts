import type { Color } from "../../../types/Types";

export type ExCalendarSize = "sm" | "md" | "lg";
export type ExCalendarColor = Exclude<Color, "secondary"> | "neutral";
export type ExCalendarView = "day" | "week" | "month";
export interface ExCalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: ExCalendarColor;
  location?: string;
  description?: string;
}
