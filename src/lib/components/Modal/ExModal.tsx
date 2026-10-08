"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import type { ExModalProps } from "./props/ExModalProps";
import { ExModalContext } from "./context/ExModalContext";

import ExButton from "../Button/ExButton";

import { cn } from "../../utils/Utils";
import { ModalSizeMap, ModalVariantMap } from "./class/ExModalClass";
import { useFocusTrap } from "../../hooks/useFocusTrap";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function ExModal({
  variant = "center",
  size = "auto",
  isOpen = false,
  closeButton = true,
  closeByOverlay = true,
  onClose,
  children,
  titleId,
  id,
  initialFocusRef,
  returnFocusRef,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: ExModalProps) {
  const isFullscreen = size === "fullscreen";

  const modalRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  useFocusTrap(isOpen && mounted, modalRef, returnFocusRef, initialFocusRef, onClose);

  const modalPosition = isFullscreen ? "inset-0" : ModalVariantMap[variant];

  if (!mounted) return null;

  return createPortal(
    <ExModalContext.Provider
      value={{
        onClose,
        isFullscreen,
      }}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            {!isFullscreen && (
              <motion.div
                className="fixed inset-0 z-98 bg-black/30 backdrop-blur-[2px]"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                }}
                onClick={() => {
                  if (closeByOverlay) {
                    onClose?.();
                  }
                }}
                aria-hidden="true"
              />
            )}

            {/* Modal */}
            <motion.div
              ref={modalRef}
              id={id}
              tabIndex={-1}
              className={cn(
                "fixed z-99 flex flex-col overflow-hidden",
                "rounded-xl border border-black/30",
                "bg-surface shadow-2xl",
                modalPosition,

                isFullscreen ? "h-full rounded-md" : [ModalSizeMap[size], "max-h-[90dvh]", "overflow-y-auto", "p-safe"],
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-label={ariaLabel ?? (titleId ? undefined : "Dialog")}
              aria-describedby={ariaDescribedBy}
              aria-hidden={!isOpen}
              initial={
                isFullscreen
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.96,
                      y: 8,
                    }
              }
              animate={
                isFullscreen
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }
              }
              exit={
                isFullscreen
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.96,
                      y: 8,
                    }
              }
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}>
              {closeButton && (
                <div className="absolute right-2 top-2 z-10">
                  <ExButton color="secondary" variant="text" size="xs" iconOnly onClick={() => onClose?.()} aria-label="Close dialog">
                    <X size={14} />
                  </ExButton>
                </div>
              )}

              <div className={cn("flex min-h-0 w-full flex-col", isFullscreen && "flex-1 overflow-auto")}>{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ExModalContext.Provider>,
    document.body,
  );
}
