import type { ExCalendarEvent, ExCalendarView, ExCalendarSize } from "../types/ExCalendarType";

export interface ExCalendarProps {
  events?: ExCalendarEvent[];
  date?: Date;
  defaultDate?: Date;
  view?: ExCalendarView;
  defaultView?: ExCalendarView;
  locale?: string;
  weekStartsOn?: 0 | 1;
  size?: ExCalendarSize;
  height?: number | string;
  className?: string;
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: ExCalendarView) => void;
  onEventClick?: (event: ExCalendarEvent) => void;
}
