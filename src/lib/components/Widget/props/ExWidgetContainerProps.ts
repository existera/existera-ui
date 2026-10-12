import type { HTMLAttributes } from "react";
import type { ExWidgetLayout } from "../types/ExWidgetType";

export interface ExWidgetContainerProps extends HTMLAttributes<HTMLDivElement> {
  layout?: ExWidgetLayout;
  defaultLayout?: ExWidgetLayout;
  /** Called when a pointer gesture finishes or a keyboard step is applied. */
  onLayoutChange?: (layout: ExWidgetLayout) => void;
  columns?: number;
  rowHeight?: number;
  gap?: number;
  /** Reduce the column count when the container gets narrower. */
  minColumnWidth?: number;
  editable?: boolean;
}
