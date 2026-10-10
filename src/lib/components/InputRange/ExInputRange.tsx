import { useNativeField } from "../../hooks/useNativeField";
import { type KeyboardEvent, type PointerEvent, useRef, useImperativeHandle, useState } from "react";
import { colorInputRangeStyles, sizeInputRangeStyles } from "./class/ExInputRangeClass";
import { ExInputRangeProps } from "./props/ExInputRangeProps";

export default function ExInputRange({
  value,
  ref,
  name,
  form,
  readOnly = false,
  required,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = "horizontal",
  showLabels = false,
  labels,
  size = "md",
  color = "primary",
  onChange,
  thumbContent,
  className = "",
  ...nativeProps
}: ExInputRangeProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const trackRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => trackRef.current!);
  const inputRef = useNativeField<HTMLInputElement>(undefined, element => {
    if (value === undefined) setInternalValue(defaultValue);
    element.value = String(Math.min(safeMax, Math.max(safeMin, value ?? defaultValue)));
  });
  const isVertical = orientation === "vertical";
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const safeStep = step > 0 ? step : 1;
  const currentValue = Math.min(safeMax, Math.max(safeMin, value ?? internalValue));
  const range = safeMax - safeMin;
  const percentage = range <= 0 ? 0 : ((currentValue - safeMin) / range) * 100;
  const displayLabels = labels?.length === 3 ? labels : [safeMin, safeMin + range / 2, safeMax];

  const currentSize = sizeInputRangeStyles[size];
  const currentColor = colorInputRangeStyles[color];
  const insetMap = { sm: 8, md: 10, lg: 12 };
  const currentInset = insetMap[size];

  const getOffset = (p: number) => ((50 - p) / 50) * currentInset;

  const normalizeValue = (nextValue: number) => {
    const stepped = Math.round((nextValue - safeMin) / safeStep) * safeStep + safeMin;
    return Math.min(safeMax, Math.max(safeMin, Number(stepped.toFixed(10))));
  };

  const setValue = (nextValue: number) => {
    if (disabled || readOnly) return;
    const normalizedValue = normalizeValue(nextValue);
    if (value === undefined) {
      setInternalValue(normalizedValue);
    }
    onChange?.(normalizedValue);
  };

  const updateValue = (clientX: number, clientY: number) => {
    if (!trackRef.current || disabled || readOnly || range <= 0) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackLength = isVertical ? rect.height : rect.width;
    const usableLength = trackLength - 2 * currentInset;
    const pointerPos = isVertical ? rect.bottom - clientY : clientX - rect.left;
    const adjustedRatio = usableLength > 0 ? (pointerPos - currentInset) / usableLength : 0;
    const clampedRatio = Math.min(1, Math.max(0, adjustedRatio));
    const rawValue = safeMin + clampedRatio * range;
    setValue(rawValue);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateValue(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || readOnly || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    updateValue(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;
    let nextValue: number | undefined;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        nextValue = currentValue + safeStep;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        nextValue = currentValue - safeStep;
        break;
      case "PageUp":
        nextValue = currentValue + safeStep * 10;
        break;
      case "PageDown":
        nextValue = currentValue - safeStep * 10;
        break;
      case "Home":
        nextValue = safeMin;
        break;
      case "End":
        nextValue = safeMax;
        break;
      default:
        return;
    }
    event.preventDefault();
    setValue(nextValue);
  };

  const positionOffset = getOffset(percentage);
  const positionStyle = isVertical
    ? { left: "50%", top: `calc(${100 - percentage}% - ${positionOffset}px)` }
    : { left: `calc(${percentage}% + ${positionOffset}px)`, top: "50%" };

  return (
    <div
      className={`relative flex ${isVertical ? currentSize.wrapperVert : currentSize.wrapperHoriz} ${disabled ? "opacity-60 grayscale" : ""} ${className}`}>
      <input ref={inputRef} type="hidden" name={name} form={form} value={currentValue} disabled={disabled} />
      <div
        {...nativeProps}
        aria-readonly={readOnly}
        aria-required={required}
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={safeMin}
        aria-valuemax={safeMax}
        aria-valuenow={currentValue}
        aria-disabled={disabled}
        aria-orientation={orientation}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={`relative flex touch-none select-none items-center rounded-full outline-none bg-secondary/30 bg-gray-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] dark:bg-gray-800 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] ${
          isVertical ? currentSize.trackVert : currentSize.trackHoriz
        } ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${currentColor.ring}`}>
        <div
          className={`absolute overflow-hidden rounded-full transition-[width,height] duration-75 ease-out ${disabled ? "bg-disabled dark:bg-disabled" : currentColor.fill} ${
            isVertical ? "bottom-0 left-0 right-0" : "inset-y-0 left-0"
          }`}
          style={
            isVertical ? { height: `calc(${percentage}% + ${positionOffset}px)` } : { width: `calc(${percentage}% + ${positionOffset}px)` }
          }
        />

        {showLabels &&
          [0, 50, 100].map((marker) => {
            const markerOffset = getOffset(marker);
            return (
              <span
                key={marker}
                aria-hidden="true"
                className={`pointer-events-none absolute z-10 box-border rounded-full transition-all duration-150 ${
                  isVertical ? "left-1/2 -translate-x-1/2 -translate-y-1/2" : "top-1/2 -translate-x-1/2 -translate-y-1/2"
                } ${currentSize.marker} ${
                  percentage >= marker ? "border-transparent bg-white shadow-sm dark:bg-white" : "bg-gray-400 dark:bg-gray-500"
                }`}
                style={
                  isVertical ? { top: `calc(${100 - marker}% - ${markerOffset}px)` } : { left: `calc(${marker}% + ${markerOffset}px)` }
                }
              />
            );
          })}

        <div
          aria-hidden="true"
          className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] ring-offset-background transition-[transform,box-shadow] duration-100 ease-out dark:border-gray-700 dark:bg-gray-950 dark:shadow-[0_2px_5px_rgba(0,0,0,0.4)] ${currentSize.thumb} ${disabled ? "text-gray-400 dark:text-gray-500" : currentColor.text} ${
            !disabled ? "hover:scale-110 hover:shadow-[0_3px_8px_rgba(0,0,0,0.15)] active:scale-95" : "pointer-events-none"
          }`}
          style={positionStyle}>
          {thumbContent}
        </div>
      </div>

      {showLabels && !isVertical && (
        <div className={`relative w-full ${currentSize.labelHoriz}`}>
          {[0, 50, 100].map((marker, idx) => (
            <span
              key={marker}
              className={`absolute top-0 -translate-x-1/2 whitespace-nowrap text-center font-medium tracking-wide ${disabled ? "text-gray-400 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"}`}
              style={{ left: `calc(${marker}% + ${getOffset(marker)}px)` }}>
              {displayLabels[idx]}
            </span>
          ))}
        </div>
      )}

      {showLabels && isVertical && (
        <div className={`absolute ${currentSize.labelVert}`}>
          {[0, 50, 100].map((marker, idx) => (
            <span
              key={marker}
              className={`absolute left-0 -translate-y-1/2 whitespace-nowrap font-medium tracking-wide ${disabled ? "text-gray-400 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"}`}
              style={{ top: `calc(${100 - marker}% - ${getOffset(marker)}px)` }}>
              {displayLabels[idx]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
