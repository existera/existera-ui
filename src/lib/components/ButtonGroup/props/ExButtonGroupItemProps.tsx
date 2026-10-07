import type { ButtonHTMLAttributes, ReactNode } from "react";
import type {
  ButtonGroupColor,
  ButtonGroupSize,
  ButtonGroupVariant,
} from "../types/ExButtonGroupType";

export interface ExButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonGroupColor;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  loading?: boolean;
  fit?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}
