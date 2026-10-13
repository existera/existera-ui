import type { HTMLAttributes } from "react";
import type { ExWidgetLayout, ExWidgetLayoutChange, ExWidgetBreakpoints } from "../types/ExWidgetType";

export interface ExWidgetContainerProps extends HTMLAttributes<HTMLDivElement> {
  layout?: ExWidgetLayout;
  defaultLayout?: ExWidgetLayout;
  /** Called when a pointer gesture finishes or a keyboard step is applied. */
  onLayoutChange?: (layout: ExWidgetLayout, change: ExWidgetLayoutChange) => void;
  /** Maximum columns. Default 12. */
  columns?: number;
  /** Minimum row divisions inside the square workspace. Existing content may require more. Default 4. */
  rows?: number;
  gap?: number;
  responsive?: boolean;
  /** Default { 0: 2, 480: 6, 768: 8, 1024: 12 }. */
  breakpoints?: ExWidgetBreakpoints;
  editable?: boolean;
}
