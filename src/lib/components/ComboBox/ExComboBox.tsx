"use client";

import React, { Children, isValidElement, type ReactElement, useEffect, useMemo, useRef, useState } from "react";
import Prefix from "../Prefix/ExPrefix";
import Suffix from "../Suffix/ExSuffix";
import ExPrefix from "../Prefix/ExPrefix";
import ExSuffix from "../Suffix/ExSuffix";
import { cn } from "../../utils/Utils";
import { CircleCheck, Loader, TriangleAlert, X } from "lucide-react";

import type { CompoundComboBox } from "./types/ExComboBoxType";
import type { ExComboBoxProps } from "./props/ExComboBoxProps";
import type { ExComboBoxItemProps, ExOption } from "./props/ExComboBoxItemProps";

import { ComboBoxPadding, ComboBoxSizeClass, ComboBoxStateClass, ComboBoxStateIconSize } from "./class/ExComboBoxClass";
import ExComboBoxItem from "./ExComboBoxItem";
import ExBadge from "../Badge/ExBadge";
import ExComboBoxContent from "./ExComboBoxContent";
import { ComboBoxItemSizeClass } from "./class/ExComboBoxItemClass";
import { EX_INPUT_OPERATOR_COMPONENT } from "../InputOperator/context/ExInputOperatorMarker";
import { useInputOperator } from "../InputOperator/context/ExInputOperatorContext";

const ExComboBox = (<T,>({
  children,
  id,
  placeholder = "Please type here...",
  value,
  leftIcon,
  rightIcon,
  size = "md",
  radius = "default",
  state = "default",
  disabled = false,
  clearable = false,
  loading = false,
  selected = [],
  multiple = false,
  debounce = 0,
  badgeVariant = "solid",
  badgeColor = "primary",
  onSelection,
  onType,
}: ExComboBoxProps<T>) => {
  const { operator, size: operatorSize } = useInputOperator();
  const inputSize = operator ? operatorSize : size;
  const [focused, setFocused] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(value ?? "");

  let prefix: React.ReactNode = null;
  let suffix: React.ReactNode = null;

  Children.forEach(children, (child) => {
    if (
      !isValidElement<{
        children?: React.ReactNode;
      }>(child)
    ) {
      return;
    }

    if (child.type === Prefix) {
      prefix = child.props.children;
    }

    if (child.type === Suffix) {
      suffix = child.props.children;
    }
  });

  const filteredItems = useMemo(() => {
    const allItems = Children.toArray(children).filter((child) => {
      if (!isValidElement<ExComboBoxItemProps<T>>(child)) {
        return false;
      }

      if (child.type !== ExComboBoxItem) {
        return false;
      }

      return true;
    });

    if (!multiple && selected.length > 0) {
      return allItems as ReactElement<ExComboBoxItemProps<T>>[];
    }

    const keyword = internalValue.trim().toLowerCase();

    if (!keyword) {
      return allItems as ReactElement<ExComboBoxItemProps<T>>[];
    }

    return allItems.filter(
      (child) => isValidElement<ExComboBoxItemProps<T>>(child) && child.props.label.toLowerCase().includes(keyword),
    ) as ReactElement<ExComboBoxItemProps<T>>[];
  }, [children, internalValue, multiple, selected]);

  const getNextEnabledIndex = (start: number, direction: 1 | -1) => {
    for (let i = start + direction; i >= 0 && i < filteredItems.length; i += direction) {
      const child = filteredItems[i];

      if (isValidElement<ExComboBoxItemProps<T>>(child) && !child.props.disabled) {
        return i;
      }
    }

    return start;
  };

  useEffect(() => {
    if (!open) {
      setActiveIndex(-1);
      return;
    }

    if (activeIndex >= filteredItems.length) {
      setActiveIndex(filteredItems.length - 1);
    }
  }, [open, filteredItems.length, activeIndex]);

  useEffect(() => {
    if (activeIndex < 0) {
      return;
    }

    itemRefs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    const nextValue = e.target.value;

    setInternalValue(nextValue);

    if (!multiple && selected.length > 0 && selected[0].label !== nextValue) {
      onSelection?.([]);
    }

    if (!onType) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (debounce <= 0) {
      onType(nextValue);
      return;
    }

    debounceRef.current = setTimeout(() => {
      onType(nextValue);
    }, debounce);
  };

  const handleClear = () => {
    if (disabled) {
      return;
    }

    setInternalValue("");
    onSelection?.([]);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    onType?.("");
  };

  const items = useMemo(() => {
    const filtered = filteredItems.map((child, index) => {
      if (!isValidElement<ExComboBoxItemProps<T>>(child)) {
        return null;
      }
      const itemValue = child.props.value;
      const selectedItem = selected.some((item) => JSON.stringify(item.value) === JSON.stringify(itemValue));
      return (
        <ExComboBoxItem
          key={child.key ?? index}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          size={inputSize}
          disabled={disabled || child.props.disabled}
          value={child.props.value}
          label={child.props.label}
          selected={selectedItem}
          active={activeIndex === index}
          onSelect={(value, label) => {
            if (disabled || child.props.disabled) {
              return;
            }
            const typedValue = value as T;
            const option: ExOption<T> = {
              value: typedValue,
              label: String(label),
            };
            let nextSelected: ExOption<T>[];
            if (multiple) {
              const exists = selected.some((item) => JSON.stringify(item.value) === JSON.stringify(typedValue));
              nextSelected = exists
                ? selected.filter((item) => JSON.stringify(item.value) !== JSON.stringify(typedValue))
                : [...selected, option];
              setInternalValue("");
              requestAnimationFrame(() => {
                if (!disabled) {
                  inputRef.current?.focus();
                }
              });
            } else {
              nextSelected = [option];
              setInternalValue(option.label);
              setOpen(false);
              requestAnimationFrame(() => {
                inputRef.current?.blur();
              });
            }
            onSelection?.(nextSelected);
          }}>
          {child.props.children}
        </ExComboBoxItem>
      );
    });

    return filtered.filter((item): item is React.ReactElement => item !== null);
  }, [filteredItems, selected, size, multiple, activeIndex, disabled]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) {
        return;
      }
      if (contentRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        className={cn(
          ComboBoxSizeClass[inputSize].height,
          ComboBoxSizeClass[inputSize].radius[radius].default,
          operator
            ? "min-w-0 flex-1"
            : "flex w-full items-center border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.28),inset_0_-1px_1px_rgba(255,255,255,0.035)]",
          disabled ? "cursor-not-allowed bg-secondary" : !operator ? "bg-surface-2" : "transparent",
        )}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={disabled ? false : open}
        aria-controls={id ? `${id}-listbox` : undefined}
        aria-owns={id ? `${id}-listbox` : undefined}
        aria-disabled={disabled}>
        {!operator && prefix && (
          <ExPrefix textarea radius={radius} size={size}>
            {prefix}
          </ExPrefix>
        )}

        <div
          className={cn(
            "relative flex h-full min-w-0 flex-1 items-center",
            selected.length === 0 ? ComboBoxPadding[inputSize].wrapper : "p-1",
            !operator && ComboBoxStateClass[state],
            !operator && !suffix && prefix && ComboBoxSizeClass[inputSize].radius[radius].prefix,
            !operator && !prefix && suffix && ComboBoxSizeClass[inputSize].radius[radius].suffix,
            !operator && !prefix && !suffix && ComboBoxSizeClass[inputSize].radius[radius].default,
            disabled && "cursor-not-allowed",
          )}>
          {leftIcon && (
            <div className={cn(ComboBoxPadding[inputSize].left, disabled || !focused ? "text-muted" : "text-foreground")}>{leftIcon}</div>
          )}

          <div className="flex min-w-0 flex-1 flex-wrap gap-1 overflow-hidden">
            {multiple &&
              selected.map((option, index) => (
                <ExBadge
                  size={size}
                  radius={radius}
                  key={index}
                  variant={badgeVariant}
                  color={badgeColor}
                  dismissible={!disabled}
                  onDismiss={() => {
                    if (disabled) {
                      return;
                    }

                    onSelection?.(selected.filter((_, i) => i !== index));
                  }}>
                  {option.label}
                </ExBadge>
              ))}

            <input
              id={id}
              ref={inputRef}
              disabled={disabled}
              role="searchbox"
              className={cn(
                selected.length > 0 && "min-w-8 flex-1",
                "border-none bg-transparent px-1 shadow-none outline-none",
                disabled && "cursor-not-allowed text-muted",
              )}
              value={internalValue}
              placeholder={selected.length ? "" : placeholder}
              onChange={handleChange}
              onFocus={() => {
                if (disabled) {
                  return;
                }

                setFocused(true);
                setOpen(true);
              }}
              onBlur={(e) => {
                setFocused(false);

                if (disabled) {
                  return;
                }

                if (!controlled && !multiple && selected.length > 0 && e.target.value !== selected[0].label) {
                  setInternalValue("");
                  onSelection?.([]);
                }

                if (selected.length === 0) {
                  setInternalValue("");
                }
              }}
              onKeyDown={(e) => {
                if (disabled || !open) {
                  return;
                }

                switch (e.key) {
                  case "ArrowDown":
                    e.preventDefault();

                    setActiveIndex((prev) => {
                      if (prev === -1) {
                        return getNextEnabledIndex(-1, 1);
                      }

                      return getNextEnabledIndex(prev, 1);
                    });

                    break;

                  case "ArrowUp":
                    e.preventDefault();

                    setActiveIndex((prev) => {
                      if (prev === -1) {
                        return getNextEnabledIndex(filteredItems.length, -1);
                      }

                      return getNextEnabledIndex(prev, -1);
                    });

                    break;

                  case "Enter": {
                    e.preventDefault();

                    if (activeIndex < 0) {
                      return;
                    }

                    const child = filteredItems[activeIndex];

                    if (isValidElement<ExComboBoxItemProps<T>>(child) && !child.props.disabled) {
                      itemRefs.current[activeIndex]?.click();
                    }

                    break;
                  }

                  case "Escape":
                    setOpen(false);
                    inputRef.current?.blur();
                    break;
                }
              }}
            />
          </div>

          {loading && (
            <div className="pl-2 text-muted">
              <Loader className={cn(ComboBoxStateIconSize[inputSize], "animate-spin-slow")} />
            </div>
          )}

          {clearable && (value || selected.length > 0) && !disabled && (
            <div className="flex items-center pl-2">
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className={cn(ComboBoxStateIconSize[inputSize], "cursor-pointer border-none bg-transparent p-0 outline-none")}
                aria-label="Clear selection">
                <X className={ComboBoxStateIconSize[inputSize]} />
              </button>
            </div>
          )}

          {state === "success" && (
            <div className="pl-2 text-success">
              <CircleCheck className={ComboBoxStateIconSize[inputSize]} />
            </div>
          )}

          {state === "error" && (
            <div className="pl-2 text-danger">
              <TriangleAlert className={ComboBoxStateIconSize[inputSize]} />
            </div>
          )}

          {rightIcon && (
            <div className={cn(ComboBoxPadding[inputSize].right, disabled || !focused ? "text-muted" : "text-foreground")}>{rightIcon}</div>
          )}
        </div>

        {!operator && suffix && (
          <ExSuffix textarea radius={radius} size={size}>
            {suffix}
          </ExSuffix>
        )}
      </div>

      <ExComboBoxContent open={disabled ? false : open} triggerRef={triggerRef} contentRef={contentRef}>
        <div id={id ? `${id}-listbox` : undefined} role="listbox" className="flex flex-col items-start gap-0 text-md">
          {items.length > 0 && items}

          {items.length === 0 && (
            <div className="w-full py-1">
              <p className={cn(ComboBoxItemSizeClass[inputSize], "select-none text-center text-muted")}>No options found.</p>
            </div>
          )}
        </div>
      </ExComboBoxContent>
    </>
  );
}) as CompoundComboBox;

ExComboBox.Prefix = Prefix;
ExComboBox.Suffix = Suffix;

(ExComboBox as any)[EX_INPUT_OPERATOR_COMPONENT] = true;
export default ExComboBox;
