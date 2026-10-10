import type { ReactNode } from "react";
import type { ComboBoxSize } from "../types/ExComboBoxType";

export interface ExOption<T> {
  label: string;
  value: T;
}

export interface ExComboBoxItemProps<T = string> extends ExOption<T> {
  size?: ComboBoxSize;
  selected?: boolean;
  active?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onSelect?: (value: T, label: ReactNode) => void;
}
