import type { ExWidgetBreakpoints, ExWidgetLayoutItem } from "../types/ExWidgetType";

export interface WidgetBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface GridMetrics {
  columns: number;
  rows: number;
  unit: number;
  gap: number;
  step: number;
}
export const defaultBreakpoints: ExWidgetBreakpoints = { 0: 2, 480: 6, 768: 8, 1024: 12 };

export function integer(value: number | undefined, fallback = 1, minimum = 1) {
  return value !== undefined && Number.isFinite(value) ? Math.max(minimum, Math.floor(value)) : fallback;
}

export function resolveColumns(size: number | null, columns: number, responsive: boolean, breakpoints: ExWidgetBreakpoints) {
  const limit = integer(columns, 12);
  if (!responsive) return limit;
  let result = Math.min(2, limit);
  for (const [minimum, count] of Object.entries(breakpoints).sort(([a], [b]) => Number(a) - Number(b))) {
    if (Number.isFinite(Number(minimum)) && Number(minimum) <= (size ?? 0)) result = integer(count);
  }
  return Math.min(limit, result);
}

export function gridMetrics(size: number, columns: number, requestedGap: number, rows = columns, fitWidth = false): GridMetrics {
  const count = integer(columns);
  const rowCount = integer(rows);
  const divisions = fitWidth ? count : Math.max(count, rowCount);
  const available = Math.max(0, Number.isFinite(size) ? size : 0);
  const gap = Math.min(integer(requestedGap, 8, 0), available / (divisions * 2));
  const unit = Math.max(0, (available - (divisions - 1) * gap) / divisions);
  return { columns: count, rows: rowCount, unit, gap, step: unit + gap };
}

export function widgetBounds(item: ExWidgetLayoutItem, metrics: GridMetrics): WidgetBounds {
  return {
    x: item.col * metrics.step,
    y: item.row * metrics.step,
    width: item.colSpan * metrics.step - metrics.gap,
    height: item.rowSpan * metrics.step - metrics.gap,
  };
}
