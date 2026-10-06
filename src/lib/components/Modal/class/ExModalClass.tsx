import type { ModalSize, ModalVariant } from "../types/ExModalType";

export const ModalVariantMap: Record<ModalVariant, string> = {
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  top: "left-1/2 top-6 -translate-x-1/2",
  bottom: "left-1/2 bottom-6 -translate-x-1/2",
};
export const ModalSizeMap: Record<ModalSize, string> = {
  auto: "w-full max-w-[95vw] lg:w-fit",
  fullscreen: "w-full h-full rounded-none",
};
