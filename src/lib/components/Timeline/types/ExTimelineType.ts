import type { ReactNode } from "react";
import type { Color, Size } from "../../../types/Types";

export type ExTimelineSize = Size;
export type ExTimelineColor = Color;
export type ExTimelineAlign = "start" | "alternate";

export interface ExTimelineItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  time?: ReactNode;
  dateTime?: string;
  icon?: ReactNode;
  color?: ExTimelineColor;
  content?: ReactNode;
}
