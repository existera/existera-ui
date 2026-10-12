"use client";

import { cn } from "../../utils/Utils";
import { useId } from "react";
import type { AnchorHTMLAttributes, ElementType, MouseEvent, ReactElement } from "react";
import type { ExButtonLinkProps, ExButtonNativeProps, ExButtonRouterProps, ExButtonStyleProps } from "./props/ExButtonProps";

import {
  ButtonBaseClass,
  ButtonCounterSizeClass,
  ButtonIconOnlyClass,
  ButtonLoadingClass,
  ButtonPaddingClass,
  ButtonPaddingRadiusFullClass,
  ButtonRadiusClass,
  ButtonSizeClass,
  ButtonVariantClass,
} from "./class/ExButtonClass";

const buttonTextAlignClass = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

type RouterRuntimeProps = ExButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color" | "type"> & {
    as: ElementType;
    type?: never;
  };

export default function ExButton<C extends ElementType>(props: ExButtonRouterProps<C>): ReactElement;
export default function ExButton(props: ExButtonNativeProps | ExButtonLinkProps): ReactElement;
export default function ExButton({
  as: Component,
  id,
  variant = "solid",
  color = "primary",
  size = "md",
  counter,
  textAlign = "center",
  radius = "default",
  loading = false,
  fit = true,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  children,
  className,
  "aria-describedby": describedBy,
  ...props
}: ExButtonNativeProps | ExButtonLinkProps | RouterRuntimeProps) {
  const isDisabled = disabled || loading;
  const counterId = useId();
  const hasCounter = counter != null;
  const descriptionIds = [describedBy, hasCounter ? counterId : undefined].filter(Boolean).join(" ") || undefined;

  const buttonClassName = cn(
    className,
    ButtonBaseClass,
    ButtonSizeClass[size],
    iconOnly ? ButtonIconOnlyClass[size] : radius === "default" ? ButtonPaddingClass[size] : ButtonPaddingRadiusFullClass[size],
    ButtonVariantClass[variant](color),
    ButtonRadiusClass[radius],
    fit ? "min-w-fit" : "w-full",
    !iconOnly && buttonTextAlignClass[textAlign],
    iconOnly && hasCounter && cn("w-auto", ButtonPaddingClass[size]),
    isDisabled ? "cursor-not-allowed opacity-70 pointer-events-none" : "cursor-pointer hover:scale-[1.01] active:scale-[0.98]",
  );

  const content = (
    <>
      {loading && <span className={cn(ButtonLoadingClass[size], "animate-spin rounded-full border-current/30 border-t-current")} />}

      {!loading && !iconOnly && leftIcon}

      {children}

      {!loading && !iconOnly && rightIcon}
      {hasCounter && (
        <span
          id={counterId}
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full bg-surface-4 font-medium leading-none tabular-nums",
            variant === "solid" ? `bg-white text-${color}` : `bg-${color} text-white`,
            ButtonCounterSizeClass[size],
          )}>
          <span className="sr-only">Total: </span>
          {counter}
        </span>
      )}
    </>
  );

  if (Component || typeof props.href === "string") {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    const { href, onClick, onAuxClick, tabIndex, target, rel, ...linkProps } = anchorProps;
    const LinkComponent = isDisabled ? "a" : (Component ?? "a");
    const forwardedProps =
      Component && isDisabled
        ? {
            title: linkProps.title,
            "aria-label": linkProps["aria-label"],
            "aria-labelledby": linkProps["aria-labelledby"],
            "aria-describedby": linkProps["aria-describedby"],
          }
        : linkProps;

    return (
      <LinkComponent
        {...forwardedProps}
        id={id}
        aria-describedby={descriptionIds}
        href={isDisabled ? undefined : href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        role={isDisabled ? "link" : linkProps.role}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading}
        tabIndex={isDisabled ? -1 : tabIndex}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          onClick?.(event);
        }}
        onAuxClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          onAuxClick?.(event);
        }}
        className={buttonClassName}>
        {content}
      </LinkComponent>
    );
  }

  const { type = "button", ...buttonProps } = props as ExButtonNativeProps;
  return (
    <button
      {...buttonProps}
      id={id}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      aria-describedby={descriptionIds}
      className={buttonClassName}>
      {content}
    </button>
  );
}
