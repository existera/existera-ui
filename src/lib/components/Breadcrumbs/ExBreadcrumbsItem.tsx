"use client";

import type { MouseEvent } from "react";
import { cn } from "../../utils/Utils";
import type { ExBreadcrumbsItemProps } from "./props/ExBreadcrumbsItemProps";

export default function ExBreadcrumbsItem({
  as: Component = "a",
  to,
  href,
  navigate,
  openMode = "self",
  active = false,
  color = "default",
  icon,
  className,
  children,
  onClick,
  ...props
}: ExBreadcrumbsItemProps) {
  const finalHref = href || to || "#";
  const colorClass = active
    ? color === "default"
      ? "text-primary font-medium"
      : "font-medium"
    : "text-muted hover:text-foreground transition-colors";
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (active) return;
    onClick?.(e);
    if (e.defaultPrevented) return;
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
  const content = (
    <span className="inline-flex items-center gap-1">
      {icon && <span className="shrink-0 [&>svg]:size-4">{icon}</span>}
      <span>{children}</span>
    </span>
  );
  if (active) {
    return (
      <span
        role="listitem"
        aria-current="page"
        className={cn("inline-flex items-center", colorClass, className)}
      >
        {content}
      </span>
    );
  }
  const Comp = Component;
  return (
    <Comp
      href={Comp === "a" ? finalHref : undefined}
      to={to}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center cursor-pointer",
        colorClass,
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
}
