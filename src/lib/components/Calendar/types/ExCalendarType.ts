import type { Color, Size } from "../../../types/Types";

export type ExCalendarSize = Size;
export type ExCalendarView = "day" | "week" | "month";
export interface ExCalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: Color;
  location?: string;
  description?: string;
}
