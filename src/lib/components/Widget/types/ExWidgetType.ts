export interface ExWidgetLayoutItem {
  id: string;
  /** Zero-based grid coordinates. */
  x: number;
  y: number;
  /** Width and height in grid cells. */
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export type ExWidgetLayout = ExWidgetLayoutItem[];
export type ExWidgetAction = "move" | "resize";
