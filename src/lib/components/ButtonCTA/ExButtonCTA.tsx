"use client";

import { createElement } from "react";
import type { AnchorHTMLAttributes, ComponentType, ElementType } from "react";
import ExButton from "../Button/ExButton";
import type { ExButtonProps, ExButtonNativeProps, ExButtonLinkProps, ExButtonStyleProps } from "../Button/props/ExButtonProps";
import { cn } from "../../utils/Utils";

export type ExButtonCTAProps<C extends ElementType = "button"> = ExButtonProps<C>;

const sizes = {
  xs: "h-10! text-sm! gap-2!",
  sm: "h-12! text-base! gap-2!",
  md: "h-14! text-lg! gap-3!",
  lg: "h-16! text-xl! gap-3!",
};

const padding = { xs: "px-4!", sm: "px-5!", md: "px-6!", lg: "px-8!" };
const iconSizes = { xs: "w-10!", sm: "w-12!", md: "w-14!", lg: "w-16!" };

type RuntimeProps = ExButtonNativeProps | ExButtonLinkProps | (
  ExButtonStyleProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color" | "type"> & { as: ElementType; type?: never }
);

const ExButtonCTA: typeof ExButton = (props: RuntimeProps) => {
  const { size = "md", iconOnly = false, counter, className } = props;
  const ctaClassName = cn(
    sizes[size],
    iconOnly && counter == null ? cn(iconSizes[size], "p-0!") : padding[size],
    className,
  );

  return createElement(ExButton as ComponentType<RuntimeProps>, { ...props, className: ctaClassName });
};

export default ExButtonCTA;
