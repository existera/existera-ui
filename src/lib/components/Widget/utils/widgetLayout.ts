import type { ExWidgetConstraints, ExWidgetLayout, ExWidgetLayoutItem } from "../types/ExWidgetType";
import { integer } from "./gridGeometry";

export type WidgetConstraintMap = Record<string, ExWidgetConstraints>;

export function effectiveLimits(limits: ExWidgetConstraints = {}, columns: number) {
  const minCol = Math.min(columns, integer(limits.minCol));
  const minRow = integer(limits.minRow);
  return {
    minCol,
    minRow,
    maxCol: Math.max(minCol, Math.min(columns, integer(limits.maxCol, columns))),
    maxRow: Math.max(minRow, integer(limits.maxRow, Number.MAX_SAFE_INTEGER)),
  };
}

export function overlaps(a: ExWidgetLayoutItem, b: ExWidgetLayoutItem) {
  return a.col < b.col + b.colSpan && a.col + a.colSpan > b.col && a.row < b.row + b.rowSpan && a.row + a.rowSpan > b.row;
}

export function normalizeWidget(item: ExWidgetLayoutItem, columns: number, constraints: ExWidgetConstraints = {}) {
  const limits = effectiveLimits(constraints, columns);
  const colSpan = Math.max(limits.minCol, Math.min(limits.maxCol, integer(item.colSpan)));
  return {
    id: item.id,
    colSpan,
    rowSpan: Math.max(limits.minRow, Math.min(limits.maxRow, integer(item.rowSpan))),
    col: Math.min(columns - colSpan, integer(item.col, 0, 0)),
    row: integer(item.row, 0, 0),
  };
}

export function arrangeWidgets(
  layout: ExWidgetLayout,
  columns: number,
  constraints: WidgetConstraintMap = {},
  activeId?: string,
): ExWidgetLayout {
  const count = integer(columns);
  const normalized = layout.map((item) => normalizeWidget(item, count, constraints[item.id]));
  const ordered = [...normalized].sort((a, b) => {
    if (a.id === b.id) return 0;
    if (a.id === activeId) return -1;
    if (b.id === activeId) return 1;
    return a.row - b.row || a.col - b.col;
  });
  const placed: ExWidgetLayout = [];
  for (const item of ordered) {
    let collision = placed.find((other) => overlaps(item, other));
    while (collision) {
      item.row = collision.row + collision.rowSpan;
      collision = placed.find((other) => overlaps(item, other));
    }
    placed.push(item);
  }
  return normalized;
}

export function updateWidget(
  layout: ExWidgetLayout,
  id: string,
  patch: Partial<ExWidgetLayoutItem>,
  columns: number,
  constraints: WidgetConstraintMap = {},
) {
  const item = layout.find((entry) => entry.id === id);
  if (!item) return layout;
  if (patch.colSpan !== undefined && patch.col === undefined) patch = { ...patch, colSpan: Math.min(columns - item.col, patch.colSpan) };
  return arrangeWidgets(
    layout.map((entry) => (entry.id === id ? { ...entry, ...patch, id } : entry)),
    columns,
    constraints,
    id,
  );
}

export function layoutRows(layout: ExWidgetLayout, minimum: number) {
  return Math.max(integer(minimum, 4), ...layout.map((item) => item.row + item.rowSpan));
}

export function sameLayout(a: ExWidgetLayout, b: ExWidgetLayout) {
  return (
    a.length === b.length &&
    a.every((item, i) => {
      const other = b[i];
      return (
        item.id === other.id &&
        item.row === other.row &&
        item.col === other.col &&
        item.rowSpan === other.rowSpan &&
        item.colSpan === other.colSpan
      );
    })
  );
}
