"use client";

import { AnimatePresence, motion } from "framer-motion";
import ExButton from "../Button/ExButton";
import type { ExFlyoutProps } from "./props/ExFlyoutProps";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/Utils";
import { useRegisterModalPortal } from "../Modal/context/ExModalContext";

export default function ExFlyout({
  isOpen,
  side = "right",
  size = "fit",
  closeByOverlay = true,
  closeButton = true,
  onClose,
  children,
}: ExFlyoutProps) {
  const registerPortalRef = useRegisterModalPortal<HTMLElement>();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const frameClass = useMemo(() => {
    if (isMobile) return "top-0 bottom-0";
    return "top-0 bottom-0";
  }, [isMobile]);

  const sideClass = useMemo(() => {
    return side === "right" ? "right-0" : "left-0";
  }, [side]);

  const sizeClass = useMemo(() => {
    if (isMobile) {
      return "max-w-[80dvw]";
    }
    switch (size) {
      case "half":
        return "w-[50vw] max-w-[760px]";
      case "fit":
      default:
        return "w-[380px] max-w-[92vw]";
    }
  }, [isMobile, size]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-96 bg-black/50 backdrop-blur-[2px]"
            onClick={() => {
              if (closeByOverlay) onClose?.();
            }}
          />

          <div className={cn("fixed z-97", frameClass, sideClass)}>
            <motion.aside
              ref={registerPortalRef}
              className={cn("h-full bg-surface shadow-xl overflow-hidden flex flex-col", sizeClass)}
              initial={{
                x: side === "right" ? "110%" : "-110%",
                y: 12,
                scale: 0.97,
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                x: side === "right" ? "110%" : "-110%",
                y: 10,
                scale: 0.97,
                opacity: 0,
                filter: "blur(6px)",
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                mass: 0.9,
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true">
              {closeButton && (
                <div className="absolute right-1.5 top-1.5">
                  <ExButton color="secondary" variant="text" size="xs" iconOnly onClick={() => onClose?.()}>
                    <X size={14} />
                  </ExButton>
                </div>
              )}
              {children}
            </motion.aside>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
