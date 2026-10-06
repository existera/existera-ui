import { useEffect, useRef, useCallback, type RefObject } from "react";

export const useFocusTrap = (
  isActive: boolean,
  containerRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null> | null = null
) => {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  const getFocusableElements = useCallback((container: HTMLElement) => {
    const focusableSelectors = [
      'button:not([disabled]):not([tabindex="-1"])',
      'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'a[href]:not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])',
      '[contenteditable]:not([tabindex="-1"]):not([disabled])',
      'video[controls]',
      'audio[controls]',
      'iframe',
    ].join(", ");

    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
      (el) => !el.hasAttribute("aria-hidden") && el.offsetParent !== null
    );
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive || !(containerRef.current instanceof HTMLElement)) return;

      if (e.key === "Tab") {
        e.preventDefault();

        const focusableElements = getFocusableElements(containerRef.current);
        const firstElement = focusableElements[0];

        if (!firstElement || focusableElements.length === 0) {
          if (triggerRef?.current) {
            triggerRef.current.focus();
          }
          return;
        }

        const currentElement = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (currentElement === firstElement) {
            const lastElement = focusableElements[focusableElements.length - 1];
            lastElement.focus();
          } else if (currentElement?.previousElementSibling instanceof HTMLElement) {
            currentElement.previousElementSibling.focus();
          }
        } else {
          const lastElement = focusableElements[focusableElements.length - 1];
          if (currentElement === lastElement) {
            firstElement.focus();
          } else if (currentElement?.nextElementSibling instanceof HTMLElement) {
            currentElement.nextElementSibling.focus();
          }
        }
      } else if (e.key === "Escape") {
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
      }
    },
    [isActive, containerRef, triggerRef, getFocusableElements]
  );

  useEffect(() => {
    if (!isActive) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    if (containerRef.current instanceof HTMLElement) {
      const focusableElements = getFocusableElements(containerRef.current);
      focusableElementsRef.current = focusableElements;
      const firstElement = focusableElements[0];

      if (firstElement) {
        firstElement.focus();
      } else if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElementRef.current) {
        if (previousActiveElementRef.current instanceof HTMLElement) {
          previousActiveElementRef.current.focus();
        }
      }
    };
  }, [isActive, containerRef, triggerRef, getFocusableElements, handleKeyDown]);

  return { triggerRef, containerRef };
};