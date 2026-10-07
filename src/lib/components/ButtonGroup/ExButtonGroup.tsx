"use client";

import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import type { ButtonGroupProps } from "./props/ExButtonGroupProps";
import type { ExButtonGroupItemProps } from "./props/ExButtonGroupItemProps";
import { cn } from "../../utils/Utils";
import { ButtogGroupRadiusClass, ButtonGroupOutlineClass, ButtonGroupSizeClass } from "./class/ExButtonGroupClass";

export default function ExButtonGroup({
  color = "primary",
  variant,
  size = "md",
  radius = "default",
  fit = true,
  children,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        ButtonGroupSizeClass[size],
        ButtogGroupRadiusClass[radius],
        variant === "outline" ? ButtonGroupOutlineClass[color] : "",
        "inline-flex isolate overflow-hidden",
        fit ? "w-fit" : "w-full",
      )}>
      {Children.map(children, (child) => {
        if (!isValidElement<ExButtonGroupItemProps>(child)) return child;

        return cloneElement(child as ReactElement<ExButtonGroupItemProps>, {
          color,
          variant,
          size,
          fit,
        });
      })}
    </div>
  );
}
