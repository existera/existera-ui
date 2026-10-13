import type { ComponentPropsWithoutRef } from "react";
import type { ExTimelineAlign, ExTimelineColor, ExTimelineItem, ExTimelineSize } from "../types/ExTimelineType";

export interface ExTimelineProps extends Omit<ComponentPropsWithoutRef<"ol">, "children"> {
  items?: ExTimelineItem[];
  size?: ExTimelineSize;
  color?: ExTimelineColor;
  align?: ExTimelineAlign;
}
