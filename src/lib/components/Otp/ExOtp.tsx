"use client";

import { useRef, useState } from "react";
import ExInput from "../Input/ExInput";
import type { InputState } from "../Input/types/ExInputType";
import { InputStateClass } from "../Input/class/ExInputClass";
import { cn } from "../../utils/Utils";

export interface ExOtpProps {
  digit?: number;
  size?: "s" | "m" | "l";
  state?: InputState;
  onChange?: (value: string) => void;
}

export default function ExOtp({ digit = 4, size = "m", state = "default", onChange }: ExOtpProps) {
  const inputSize = { s: "sm", m: "md", l: "lg" } as const;
  const boxSize = { s: "size-10", m: "size-12", l: "size-14" };
  const fontSize = { s: "text-lg", m: "text-xl", l: "text-2xl" };
  const count = Number.isFinite(digit) ? Math.max(1, Math.floor(digit)) : 4;
  const [values, setValues] = useState<string[]>([]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [previousCount, setPreviousCount] = useState(count);

  if (previousCount !== count) {
    setPreviousCount(count);
    setValues(values.slice(0, count));
  }

  const focus = (index: number) => {
    inputs.current[index]?.focus();
    inputs.current[index]?.select();
  };

  const update = (index: number, text: string) => {
    const numbers = text.replace(/\D/g, "").slice(0, count - index);
    if (text && !numbers) return;
    const next = Array.from({ length: count }, (_, position) => values[position] ?? "");
    if (!numbers) next[index] = "";
    else
      Array.from(numbers).forEach((number, offset) => {
        next[index + offset] = number;
      });
    setValues(next);
    onChange?.(next.join(""));
    if (numbers) focus(Math.min(index + numbers.length, count - 1));
  };

  return (
    <div role="group" aria-label="OTP" className="inline-flex w-fit flex-none items-center justify-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`${boxSize[size]} shrink-0`}
          onPaste={(event) => {
            event.preventDefault();
            update(index, event.clipboardData.getData("text"));
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace") {
              event.preventDefault();
              const target = values[index] ? index : Math.max(0, index - 1);
              update(target, "");
              focus(target);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              focus(Math.max(0, Math.min(count - 1, index + (event.key === "ArrowLeft" ? -1 : 1))));
            }
          }}>
          <ExInput
            ref={(element) => {
              inputs.current[index] = element;
            }}
            size={inputSize[size]}
            className={cn(
              "h-full min-h-0",
              fontSize[size],
              state !== "default" && InputStateClass[state],
              state !== "default" && "[&>div]:focus-within:outline-none",
            )}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`OTP digit ${index + 1}`}
            aria-invalid={state === "error"}
            value={values[index] ?? ""}
            placeholder="*"
            textAlign="center"
            onFocus={(event) => event.currentTarget.select()}
            onChange={(value) => update(index, value)}
          />
        </div>
      ))}
    </div>
  );
}
