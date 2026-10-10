import type { TooltipAlign, TooltipPosition } from "../types/ExTooltipType";

export interface ExTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  align?: TooltipAlign;
  delay?: number;
  clickable?: boolean;
  className?: string;
  contentClassName?: string;
}
