import type { ExWidgetLayout, ExWidgetLayoutItem } from "./types/ExWidgetType";

export function gridNumber(value: number, fallback = 1, minimum = 1) {
  return Number.isFinite(value) ? Math.max(minimum, Math.round(value)) : fallback;
}

export function overlaps(a: ExWidgetLayoutItem, b: ExWidgetLayoutItem) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/** Preserve the active widget and push collisions down; never mutate caller data. */
export function arrangeWidgets(layout: ExWidgetLayout, columns: number, activeId?: string): ExWidgetLayout {
  const count = gridNumber(columns);
  const normalized = layout.map((item) => {
    const minW = Math.min(count, gridNumber(item.minW ?? 1));
    const maxW = Math.max(minW, Math.min(count, gridNumber(item.maxW ?? count)));
    const minH = gridNumber(item.minH ?? 1);
    const maxH = Math.max(minH, gridNumber(item.maxH ?? Number.MAX_SAFE_INTEGER));
    const w = Math.max(minW, Math.min(maxW, gridNumber(item.w)));
    return { ...item, w, h: Math.max(minH, Math.min(maxH, gridNumber(item.h))),
      x: Math.min(count - w, gridNumber(item.x, 0, 0)), y: gridNumber(item.y, 0, 0) };
  });
  const ordered = [...normalized].sort((a, b) => {
    if (a.id === activeId) return -1;
    if (b.id === activeId) return 1;
    return a.y - b.y || a.x - b.x;
  });
  const placed: ExWidgetLayout = [];
  for (const item of ordered) {
    let collision = placed.find((other) => overlaps(item, other));
    while (collision) {
      item.y = collision.y + collision.h;
      collision = placed.find((other) => overlaps(item, other));
    }
    placed.push(item);
  }
  return normalized;
}

export function updateWidget(layout: ExWidgetLayout, id: string, patch: Partial<ExWidgetLayoutItem>, columns: number) {
  return arrangeWidgets(layout.map((item) => item.id === id ? { ...item, ...patch, id } : item), columns, id);
}
