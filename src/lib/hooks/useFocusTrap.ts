import { useEffect, useRef, type RefObject } from "react";
import { activateFocusTrap } from "./focusTrap";

export const useFocusTrap = (
  isActive: boolean,
  containerRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null> | null = null,
  initialFocusRef?: RefObject<HTMLElement | null>,
  onEscape?: () => void,
) => {
  const escapeRef = useRef(onEscape);
  useEffect(() => { escapeRef.current = onEscape; }, [onEscape]);
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    return activateFocusTrap(containerRef.current, {
      initialFocus: initialFocusRef?.current,
      returnFocus: triggerRef?.current,
      onEscape: () => escapeRef.current?.(),
    });
  }, [isActive, containerRef, triggerRef, initialFocusRef]);
  return { triggerRef, containerRef };
};
