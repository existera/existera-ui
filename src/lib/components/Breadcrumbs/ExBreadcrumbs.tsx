"use client";

import React from "react";
import { cn } from "../../utils/Utils";
import type { ExBreadcrumbsProps } from "./props/ExBreadcrumbsProps";
import type { ExBreadcrumbsItemProps } from "./props/ExBreadcrumbsItemProps";

const BreadcrumbsSizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

export default function ExBreadcrumbs({
  children,
  size = "md",
  separator = "/",
  color = "default",
}: ExBreadcrumbsProps) {
  const items = React.Children.toArray(children);
  return (
    <nav
      aria-label="breadcrumb"
    >
      <ol className={cn("flex items-center flex-wrap gap-2 select-none", BreadcrumbsSizeMap[size])}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        const isLast = index === items.length - 1;
        const clonedChild = React.cloneElement(
          child as React.ReactElement<ExBreadcrumbsItemProps>,
          {
            active: isLast,
            color,
          },
        );
        return (
          <li key={index} className="inline-flex items-center gap-2">
            {clonedChild}
            {!isLast && <span aria-hidden="true" className="text-muted">{separator}</span>}
          </li>
        );
      })}
      </ol>
    </nav>
  );
}
