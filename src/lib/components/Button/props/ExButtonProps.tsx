import type { ButtonHTMLAttributes, ReactNode } from "react";

import type {
  ButtonColor,
  ButtonRadius,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from "../types/ExButtonType";

export interface ExButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textAlign?: ButtonTextAlign;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  fit?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  radius?: ButtonRadius;
}
