export interface ExWidgetLayoutItem {
  id: string;
  /** Zero-based grid coordinates. */
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
}

export interface ExWidgetConstraints {
  minRow?: number;
  maxRow?: number;
  minCol?: number;
  maxCol?: number;
}

export type ExWidgetLayout = ExWidgetLayoutItem[];
export type ExWidgetAction = "move" | "resize";
/** Minimum container size in pixels mapped to a column count. */
export type ExWidgetBreakpoints = Record<number, number>;
export interface ExWidgetLayoutChange {
  columns: number;
  rows: number;
  action: ExWidgetAction;
  widgetId: string;
}
