import type { CSSProperties } from "react";
import type { ProgressColor, ProgressSize } from "../types/ExProgressType";

export interface ExProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  showValue?: boolean;
  radius?: boolean;
  className?: string;
  style?: CSSProperties;
}
