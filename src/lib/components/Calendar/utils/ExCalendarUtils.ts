import type { ExCalendarEvent, ExCalendarView } from "../types/ExCalendarType";

export const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export function addDays(date: Date, count: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + count);
  return result;
}
export const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();
export function weekStart(date: Date, first: number) {
  return addDays(startOfDay(date), -((date.getDay() - first + 7) % 7));
}
export function navigateDate(date: Date, view: ExCalendarView, direction: number) {
  if (view !== "month") return addDays(date, direction * (view === "week" ? 7 : 1));
  const next = new Date(date.getFullYear(), date.getMonth() + direction, 1);
  next.setDate(Math.min(date.getDate(), new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()));
  return next;
}
export const validEvent = (event: ExCalendarEvent) => Number.isFinite(+event.start) && Number.isFinite(+event.end) && event.end > event.start;
export const eventsForDay = (events: ExCalendarEvent[], day: Date) => events.filter(event => event.start < addDays(day, 1) && event.end > day);
export function layoutEvents(events: ExCalendarEvent[], day: Date) {
  const next = addDays(day, 1);
  const minutes = (date: Date) => date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  const entries = eventsForDay(events, day).filter(event => !event.allDay).map(event => {
    const start = event.start < day ? 0 : minutes(event.start);
    const end = event.end >= next ? 1440 : minutes(event.end);
    return { event, start, end: Math.min(1440, Math.max(start + 24, end)), column: 0, columns: 1, span: 1 };
  }).sort((a, b) => a.start - b.start || b.end - a.end);
  let group: typeof entries = [];
  let ends: number[] = [];
  let boundary = -1;
  const flush = () => {
    for (const entry of group) {
      entry.columns = ends.length;
      for (let column = entry.column + 1; column < ends.length; column++) {
        if (group.some(other => other.column === column && other.start < entry.end && other.end > entry.start)) break;
        entry.span++;
      }
    }
  };
  for (const entry of entries) {
    if (entry.start >= boundary) { flush(); group = []; ends = []; boundary = -1; }
    let column = ends.findIndex(end => end <= entry.start);
    if (column === -1) column = ends.length;
    entry.column = column;
    ends[column] = entry.end;
    boundary = Math.max(boundary, entry.end);
    group.push(entry);
  }
  flush();
  return entries;
}

/** Calendar-day coverage respects an exclusive end, including midnight. */
export const isMultiDay = (event: ExCalendarEvent) => !sameDay(event.start, new Date(+event.end - 1));
export function layoutSpans(events: ExCalendarEvent[], days: Date[]) {
  if (!days.length) return [];
  const end = addDays(days[days.length - 1], 1);
  const segments = events.filter(event => validEvent(event) && event.start < end && event.end > days[0]).map(event => {
    const startColumn = days.findIndex(day => event.start < addDays(day, 1));
    let endColumn = days.length;
    while (endColumn > 0 && event.end <= days[endColumn - 1]) endColumn--;
    return { event, startColumn, endColumn, lane: 0, continuesBefore: event.start < days[0], continuesAfter: event.end > end };
  }).sort((a, b) => a.startColumn - b.startColumn || (b.endColumn - b.startColumn) - (a.endColumn - a.startColumn) || +a.event.start - +b.event.start || a.event.id.localeCompare(b.event.id));
  const lanes: number[] = [];
  for (const segment of segments) {
    let lane = lanes.findIndex(endColumn => endColumn <= segment.startColumn);
    if (lane < 0) lane = lanes.length;
    lanes[lane] = segment.endColumn;
    segment.lane = lane;
  }
  return segments;
}
