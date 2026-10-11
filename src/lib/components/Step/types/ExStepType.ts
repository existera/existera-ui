import type { Color, Size } from "../../../types/Types";

export type ExStepSize = Size;
export type ExStepColor = Color;
export type ExStepOrientation = "horizontal" | "vertical";

export interface ExStepItem {
  id?: string;
  title: string;
  description?: string;
  disabled?: boolean;
  /** Marks a step as needing attention without losing the current position. */
  error?: boolean;
}
