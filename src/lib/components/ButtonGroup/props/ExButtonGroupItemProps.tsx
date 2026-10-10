import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonGroupColor, ButtonGroupSize, ButtonGroupVariant } from "../types/ExButtonGroupType";

export interface ExButtonGroupItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "color"> {
  value?: string;
  color?: ButtonGroupColor;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  fit?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  active?: boolean;
}
