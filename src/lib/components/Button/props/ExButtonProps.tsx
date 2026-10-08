import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import type {
  ButtonColor,
  ButtonRadius,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from "../types/ExButtonType";

interface ExButtonStyleProps {
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
  disabled?: boolean;
}

export type ExButtonNativeProps = ExButtonStyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    href?: never;
  };

export type ExButtonLinkProps = ExButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color" | "type"> & {
    href: string;
    type?: never;
  };

export type ExButtonProps = ExButtonNativeProps | ExButtonLinkProps;
