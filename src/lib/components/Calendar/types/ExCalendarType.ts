import type { Color, Size } from "../../../types/Types";

export type ExCalendarSize = Size;
export type ExCalendarView = "day" | "week" | "month";
export interface ExCalendarEvent {
  id: string;
  title: string;
  start: Date;
  /** Exclusive end; all-day events end at midnight after their last day. */
  end: Date;
  allDay?: boolean;
  color?: Color;
  location?: string;
  description?: string;
}
