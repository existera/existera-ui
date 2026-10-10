import type { ExFormFieldProps } from "../../../types/Form";
import type { ReactNode } from "react";
import type { TimeSelectorRadius, TimeSelectorSize, TimeSelectorState } from "../types/ExTimeSelectorType";

export interface ExTimeSelectorProps extends ExFormFieldProps<HTMLInputElement> {
  id?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
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
  onChange?: (value: string) => void;
  onType?: (value: string) => void;
}
