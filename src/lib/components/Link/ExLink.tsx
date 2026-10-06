"use client";

import { forwardRef, type MouseEvent } from "react";
import type { ExLinkProps } from "./props/ExLinkProps";
import {
  LinkBaseClass,
  LinkColorClass,
  LinkSizeClass,
  LinkUnderlineClass,
  LinkWeightClass,
} from "./class/ExLinkClass";
import { cn } from "../../utils/Utils";

const ExLink = forwardRef<HTMLAnchorElement, ExLinkProps>(
  (
    {
      as: Component = "a",
      href,
      to,
      openMode = "self",
      navigate,
      color = "default",
      size = "md",
      weight = "light",
      underline = "hover",
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      onClick,
      rel,
      target,
      ...props
    },
    ref,
  ) => {
    const finalHref = href || to || "#";

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
      if (e.defaultPrevented) {
        return;
      }
      if (navigate && to) {
        e.preventDefault();
        navigate(to);
        return;
      }
      switch (openMode) {
        case "tab":
          e.preventDefault();
          window.open(finalHref, "_blank", "noopener,noreferrer");
          break;
        case "window":
          e.preventDefault();
          window.open(finalHref, "_blank", "popup=yes,width=1200,height=800");
          break;
        case "self":
        default:
          break;
      }
    };
    const computedTarget = openMode === "tab" ? "_blank" : target;
    const computedRel = openMode === "tab" ? "noopener noreferrer" : rel;

    return (
      <Component
        ref={ref}
        href={disabled ? undefined : finalHref}
        target={computedTarget}
        rel={computedRel}
        aria-disabled={disabled}
        onClick={handleClick}
        className={cn(
          LinkBaseClass,
          LinkColorClass[color],
          LinkSizeClass[size],
          LinkWeightClass[weight],
          LinkUnderlineClass[underline],
          disabled && "pointer-events-none opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </Component>
    );
  },
);

ExLink.displayName = "ExLink";
export default ExLink;