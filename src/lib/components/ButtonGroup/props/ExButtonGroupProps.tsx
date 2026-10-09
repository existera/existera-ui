import type { HTMLAttributes, ReactNode } from "react";
import type {
  ButtonGroupColor,
  ButtonGroupRadius,
  ButtonGroupResponsive,
  ButtonGroupSize,
  ButtonGroupVariant,
} from "../types/ExButtonGroupType";

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  color?: ButtonGroupColor;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  radius?: ButtonGroupRadius;
  fit?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  responsive?: ButtonGroupResponsive;
  children?: ReactNode;
}
