import { useEffect, useId, useRef, type KeyboardEvent, type RefObject } from "react";

export function usePickerKeyboard(
  open: boolean,
  setOpen: (open: boolean) => void,
  triggerRef: RefObject<HTMLDivElement | null>,
  contentRef: RefObject<HTMLDivElement | null>,
  disabled: boolean,
) {
  const popupId = useId();
  const origin = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const dismiss = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    if (origin.current?.isConnected) origin.current.focus();
    else triggerRef.current?.querySelector<HTMLInputElement>('input:not([type="hidden"]):not(:disabled)')?.focus();
    setOpen(false);
  };
  useEffect(() => {
    if (!open) return;
    const outside = (e: Event) => {
      if (!triggerRef.current?.contains(e.target as Node) && !contentRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("focusin", outside);
    document.addEventListener("mousedown", outside);
    return () => {
      document.removeEventListener("focusin", outside);
      document.removeEventListener("mousedown", outside);
    };
  }, [open, setOpen, triggerRef, contentRef]);
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );
  const onTriggerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || e.defaultPrevented) return;
    if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      dismiss();
      return;
    }
    if (!["Enter", " ", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    origin.current = e.currentTarget;
    setOpen(true);
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const content = contentRef.current;
      const selector =
        origin.current?.getAttribute("placeholder") === "Minute"
          ? '[data-time-part="minute"][tabindex="0"]'
          : '[data-calendar-day][tabindex="0"], [data-time-part][tabindex="0"]';
      (content?.querySelector<HTMLElement>(selector) ?? content?.querySelector<HTMLElement>("button:not(:disabled)"))?.focus();
    });
  };
  const onPopupKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      dismiss();
    }
    if (e.key === "Tab" && !e.defaultPrevented) {
      const controls = Array.from(
        contentRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),[tabindex="0"]') ?? [],
      ).filter((element) => element.tabIndex >= 0 && !element.closest("[hidden],[inert]"));
      const boundary = e.shiftKey ? controls[0] : controls.at(-1);
      if (document.activeElement === boundary) dismiss();
    }
  };
  return {
    popupId,
    rememberTrigger: (element: HTMLInputElement) => {
      origin.current = element;
    },
    dismiss,
    onTriggerKeyDown,
    onPopupKeyDown,
  };
}
