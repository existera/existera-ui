import type { ExFormFieldProps } from "../../../types/Form";
import type { ReactNode } from "react";
import type {
  ComboBoxRadius,
  ComboBoxSize,
  ComboBoxState,
} from "../types/ExComboBoxType";
import type { ExOption } from "./ExComboBoxItemProps";
import type { BadgeColor, BadgeVariant } from "../../Badge/types/ExBadgeType";

export interface ExComboBoxProps<T> extends ExFormFieldProps<HTMLInputElement> {
  id?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  children?: ReactNode;
  debounce?: number;
  state?: ComboBoxState;
  size?: ComboBoxSize;
  radius?: ComboBoxRadius;
  loading?: boolean;
  clearable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  multiple?: boolean;
  selected?: ExOption<T>[];
  defaultSelected?: ExOption<T>[];
  defaultValue?: string;
  onChange?: (options: ExOption<T>[]) => void;
  onSearchChange?: (value: string) => void;
  getOptionValue?: (option: ExOption<T>) => string;
  badgeVariant?: BadgeVariant;
  badgeColor?: BadgeColor;
  onSelection?: (option: ExOption<T>[]) => void;
  onType?: (value: string) => void;
}
