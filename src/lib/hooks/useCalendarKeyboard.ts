import { useLayoutEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";

export const calendarKey = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");

export function useCalendarKeyboard(
  days: { value: Date; current: boolean }[],
  selected: Date | undefined,
  isEnabled: (date: Date) => boolean,
  setMonth: (date: Date) => void,
  contentRef: RefObject<HTMLDivElement | null>,
) {
  const [focusedDay, setFocusedDay] = useState("");
  const pending = useRef<string | null>(null);
  const enabled = days.filter((day) => isEnabled(day.value));
  const preferred = [focusedDay, selected && calendarKey(selected), calendarKey(new Date())];
  const active =
    preferred.map((key) => enabled.find((day) => calendarKey(day.value) === key)).find(Boolean) ??
    enabled.find((day) => day.current) ??
    enabled[0];
  useLayoutEffect(() => {
    if (!pending.current) return;
    const button = Array.from(contentRef.current?.querySelectorAll<HTMLButtonElement>("[data-calendar-day]") ?? []).find(
      (button) => button.dataset.calendarDay === pending.current,
    );
    if (button) {
      pending.current = null;
      button.focus();
    }
  });
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    const next = new Date(date);
    let direction = ["ArrowLeft", "ArrowUp", "Home", "PageUp"].includes(e.key) ? -1 : 1;
    if (e.key.startsWith("Page")) {
      const day = next.getDate();
      next.setDate(1);
      next.setMonth(next.getMonth() + direction * (e.shiftKey ? 12 : 1));
      next.setDate(Math.min(day, new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()));
    } else
      next.setDate(
        next.getDate() +
          (e.key === "Home"
            ? -next.getDay()
            : e.key === "End"
              ? 6 - next.getDay()
              : e.key === "ArrowUp"
                ? -7
                : e.key === "ArrowDown"
                  ? 7
                  : direction),
      );
    if (e.key === "Home" || e.key === "End") {
      direction = e.key === "Home" ? 1 : -1;
      for (let n = 0; n < 6 && !isEnabled(next); n++) next.setDate(next.getDate() + direction);
    }
    if (!isEnabled(next)) return;
    pending.current = calendarKey(next);
    setFocusedDay(pending.current);
    setMonth(next);
  };
  return (date: Date) => ({
    "data-calendar-day": calendarKey(date),
    tabIndex: active && calendarKey(active.value) === calendarKey(date) ? 0 : -1,
    "aria-label": date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    onFocus: () => setFocusedDay(calendarKey(date)),
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => onKeyDown(e, date),
  });
}

export function handlePickerGroupKeyDown(e: KeyboardEvent<HTMLButtonElement>, columns = 1) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;
  const buttons = Array.from(e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []);
  const index = buttons.indexOf(e.currentTarget);
  const delta = e.key === "ArrowUp" ? -columns : e.key === "ArrowDown" ? columns : e.key === "ArrowLeft" ? -1 : 1;
  const next = e.key === "Home" ? 0 : e.key === "End" ? buttons.length - 1 : (index + delta + buttons.length) % buttons.length;
  e.preventDefault();
  e.stopPropagation();
  buttons.forEach((button) => {
    button.tabIndex = -1;
  });
  if (buttons[next]) {
    buttons[next].tabIndex = 0;
    buttons[next].focus();
  }
}
