import type { HTMLAttributes, ReactNode } from "react";

export interface ExWidgetCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  widgetId: string;
  title?: ReactNode;
  actions?: ReactNode;
  draggable?: boolean;
  resizable?: boolean;
  contentClassName?: string;
  moveLabel?: string;
  resizeLabel?: string;
}
