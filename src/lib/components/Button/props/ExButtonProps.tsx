import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import type { ButtonColor, ButtonRadius, ButtonSize, ButtonTextAlign, ButtonVariant } from "../types/ExButtonType";

export interface ExButtonStyleProps {
  textAlign?: ButtonTextAlign;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  counter?: number;
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
    as?: never;
  };

export type ExButtonLinkProps = ExButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color" | "type"> & {
    href: string;
    type?: never;
    as?: never;
  };

export type ExButtonRouterProps<C extends ElementType> = ExButtonStyleProps & {
  as: C;
  type?: never;
} & Omit<ComponentPropsWithoutRef<NoInfer<C>>, keyof ExButtonStyleProps | "as" | "type">;

export type ExButtonProps<C extends ElementType = "button"> = ExButtonNativeProps | ExButtonLinkProps | ExButtonRouterProps<C>;
