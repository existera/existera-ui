import type { ReactNode } from "react";
import type { ExTreeViewSize } from "../types/ExTreeViewType";

export interface ExTreeViewProps {
  size?: ExTreeViewSize;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
