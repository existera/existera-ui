import type { ExWidgetAction, ExWidgetConstraints, ExWidgetLayoutItem } from "../types/ExWidgetType";
import type { GridMetrics, WidgetBounds } from "./gridGeometry";
import { effectiveLimits } from "./widgetLayout";

export function pointerTarget(
  origin: ExWidgetLayoutItem,
  bounds: WidgetBounds,
  action: ExWidgetAction,
  dx: number,
  dy: number,
  metrics: GridMetrics,
  constraints: ExWidgetConstraints = {},
) {
  const { step, gap, columns, rows } = metrics;
  const limits = effectiveLimits(constraints, columns);
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
  
  const pixels =
    action === "move"
      ? { ...bounds, x: clamp(bounds.x + dx, 0, (columns - origin.colSpan) * step), y: clamp(bounds.y + dy, 0, (rows - origin.rowSpan) * step) }
      : {
          ...bounds,
          width: clamp(bounds.width + dx, limits.minCol * step - gap, Math.min(limits.maxCol, columns - origin.col) * step - gap),
          height: clamp(bounds.height + dy, limits.minRow * step - gap, Math.min(limits.maxRow, rows - origin.row) * step - gap),
        };

  const patch =
    action === "move"
      ? { col: Math.round(pixels.x / step), row: Math.round(pixels.y / step) }
      : { colSpan: Math.round((pixels.width + gap) / step), rowSpan: Math.round((pixels.height + gap) / step) };
  return { pixels, patch };
}
