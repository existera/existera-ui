import type { ReactNode } from "react";
import type { TimeSelectorRadius, TimeSelectorSize, TimeSelectorState } from "../types/ExTimeSelectorType";

export interface ExTimeSelectorProps {
  id?: string;
  type?: string;
  value?: string;
  children?: ReactNode;
  state?: TimeSelectorState;
  disabled?: boolean;
  size?: TimeSelectorSize;
  radius?: TimeSelectorRadius;
  loading?: boolean;
  clearable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  debounce?: number;
  format?: 12 | 24;
  onType?: (value: string) => void;
}
