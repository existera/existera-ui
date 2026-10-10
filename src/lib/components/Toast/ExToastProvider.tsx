"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import ExPortal from "./ExPortal";
import ExToast from "./ExToast";

import { ToastContext, type ExToastProviderProps, type ToastItemProps } from "./props/ExToastProps";

import { cn } from "../../utils/Utils";

const POSITION_CLASS = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",

  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
} as const;

const POSITION_ANIMATION = {
  "top-left": {
    initial: { x: -120, y: 0 },
    exit: { x: -120, y: 0 },
  },

  "top-center": {
    initial: { x: 0, y: -40 },
    exit: { x: 0, y: -40 },
  },

  "top-right": {
    initial: { x: 120, y: 0 },
    exit: { x: 120, y: 0 },
  },

  "bottom-left": {
    initial: { x: -120, y: 0 },
    exit: { x: -120, y: 0 },
  },

  "bottom-center": {
    initial: { x: 0, y: 40 },
    exit: { x: 0, y: 40 },
  },

  "bottom-right": {
    initial: { x: 120, y: 0 },
    exit: { x: 120, y: 0 },
  },
} as const;

const POSITIONS = Object.keys(POSITION_CLASS) as Array<keyof typeof POSITION_CLASS>;

export default function ExToastProvider({ children }: ExToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const show = useCallback(
    (toast: Omit<ToastItemProps, "id">) => {
      const id = crypto.randomUUID();

      setToasts((prev) => [
        ...prev,
        {
          ...toast,
          id,
          position: toast.position ?? "top-right",
          layout: toast.layout ?? "stack",
        },
      ]);

      if (toast.duration !== undefined && toast.duration > 0) {
        window.setTimeout(() => {
          remove(id);
        }, toast.duration);
      }
    },
    [remove],
  );

  const value = useMemo(
    () => ({
      show,
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ExPortal>
        {POSITIONS.map((position) => {
          const items = toasts.filter((item) => item.position === position).reverse();

          if (items.length === 0) {
            return null;
          }

          const isBottom = position.startsWith("bottom");

          const isLeft = position.includes("left");

          const isRight = position.includes("right");

          const isCenter = position.includes("center");

          const animation = POSITION_ANIMATION[position];

          /*
           * Pisahkan toast berdasarkan layout.
           *
           * Toast dengan layout stack akan
           * menggunakan normal flow.
           *
           * Toast dengan layout overlap akan
           * menggunakan absolute positioning.
           */
          const stackItems = items.filter((item) => item.layout !== "overlap");

          const overlapItems = items.filter((item) => item.layout === "overlap");

          return (
            <div key={position} className={cn("pointer-events-none fixed z-9999", POSITION_CLASS[position])}>
              {/* STACK */}

              {stackItems.length > 0 && (
                <div className="flex w-80 flex-col gap-2">
                  <AnimatePresence initial={false}>
                    {stackItems.map((toast) => (
                      <motion.div
                        key={toast.id}
                        layout
                        className="pointer-events-auto relative w-80"
                        initial={{
                          opacity: 0,
                          ...animation.initial,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          ...animation.exit,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}>
                        <ExToast toast={toast} onClose={remove} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* OVERLAP */}

              {overlapItems.length > 0 && (
                <div className="relative h-0 w-80">
                  <AnimatePresence initial={false}>
                    {overlapItems.map((toast, index) => {
                      const stack = Math.min(index, 3);

                      return (
                        <motion.div
                          key={toast.id}
                          layout
                          className={cn(
                            "pointer-events-auto absolute w-80",

                            isLeft && "left-0",
                            isRight && "right-0",
                            isCenter && "left-1/2 -translate-x-1/2",

                            isBottom ? "bottom-0" : "top-0",
                          )}
                          initial={{
                            opacity: 0,
                            scale: 0.9,
                            ...animation.initial,
                          }}
                          animate={{
                            opacity: index < 5 ? 1 : 0,

                            x: 0,

                            y: isBottom ? -(stack * 14) : stack * 14,

                            scale: 1 - stack * 0.04,

                            filter: `blur(${stack * 0.5}px)`,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.9,
                            ...animation.exit,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                          style={{
                            zIndex: 100 - index,
                          }}>
                          <ExToast toast={toast} onClose={remove} />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          );
        })}
      </ExPortal>
    </ToastContext.Provider>
  );
}
