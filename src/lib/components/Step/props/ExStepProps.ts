import type { CSSProperties } from "react";
import type { ExStepColor, ExStepItem, ExStepOrientation, ExStepSize } from "../types/ExStepType";

export interface ExStepProps {
  steps?: ExStepItem[];
  activeStep?: number;
  size?: ExStepSize;
  color?: ExStepColor;
  orientation?: ExStepOrientation;
  onStepChange?: (index: number, step: ExStepItem) => void;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
