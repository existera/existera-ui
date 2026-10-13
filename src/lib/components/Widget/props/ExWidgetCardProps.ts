import type { HTMLAttributes } from "react";
import type { ExWidgetConstraints } from "../types/ExWidgetType";

export interface ExWidgetCardProps extends HTMLAttributes<HTMLDivElement>, ExWidgetConstraints {
  widgetId: string;
  rowSpan?: number;
  colSpan?: number;
  draggable?: boolean;
  resizable?: boolean;
  moveLabel?: string;
  resizeLabel?: string;
  dragHandleClassName?: string;
  resizeHandleClassName?: string;
}
