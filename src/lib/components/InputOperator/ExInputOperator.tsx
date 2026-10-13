"use client";

import { Children, isValidElement, type ElementType } from "react";
import { cn } from "../../utils/Utils";
import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";
import { InputOperatorSizeClass, InputOperatorStateClass } from "./class/ExInputOperatorClass";
import { CompoundInputOperator } from "./types/ExInputOperatorType";
import { OperatorProps } from "./props/ExInputOperatorProps";
import { InputOperatorProvider } from "./context/ExInputOperatorContext";
import { EX_INPUT_OPERATOR_COMPONENT } from "./context/ExInputOperatorMarker";

type MarkedOperator = ElementType & {
  [EX_INPUT_OPERATOR_COMPONENT]?: boolean;
};

const Operator = ({ children }: OperatorProps) => {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "px-1",
        "text-sm font-medium",
        "text-muted-foreground",
        "select-none",
      )}>
      {children}
    </span>
  );
};
(Operator as MarkedOperator)[EX_INPUT_OPERATOR_COMPONENT] = true;

const isValidOperatorChild = (type: ElementType) => {
  return Boolean((type as MarkedOperator)[EX_INPUT_OPERATOR_COMPONENT]);
};

const ExInputOperator: CompoundInputOperator = ({ children, id, size = "md", radius = "default", disabled = false, state = "default" }) => {
  let prefix: React.ReactNode = null;
  let suffix: React.ReactNode = null;

  const content: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === Prefix) {
      const props = child.props as {
        children?: React.ReactNode;
      };
      prefix = props.children;
      return;
    }

    if (child.type === Suffix) {
      const props = child.props as {
        children?: React.ReactNode;
      };
      suffix = props.children;
      return;
    }

    if (!isValidOperatorChild(child.type as React.ElementType)) {
      console.warn("[ExInputOperator] Invalid child component.");
      return;
    }

    content.push(child);
  });

  return (
    <InputOperatorProvider value={{ operator: true, size }}>
      <div
        id={id}
        className={cn(
          InputOperatorSizeClass[size].radius[radius].default,
          "flex w-full items-center border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
          disabled ? "cursor-not-allowed bg-surface-4 select-none" : "bg-surface-2",
        )}>
        {prefix && (
          <ExPrefix radius={radius} size={size}>
            {prefix}
          </ExPrefix>
        )}

        <div
          className={cn(
            "relative flex h-full w-full items-center gap-1",
            InputOperatorStateClass[state],
            !suffix && prefix && InputOperatorSizeClass[size].radius[radius].prefix,
            !prefix && suffix && InputOperatorSizeClass[size].radius[radius].suffix,
            !prefix && !suffix && InputOperatorSizeClass[size].radius[radius].default,
            disabled && "cursor-not-allowed",
          )}>
          {content}
        </div>

        {suffix && (
          <ExSuffix radius={radius} size={size}>
            {suffix}
          </ExSuffix>
        )}
      </div>
    </InputOperatorProvider>
  );
};

ExInputOperator.Prefix = Prefix;
ExInputOperator.Suffix = Suffix;
ExInputOperator.Operator = Operator;

export default ExInputOperator;
