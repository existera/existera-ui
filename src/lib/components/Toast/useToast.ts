"use client";

import { useContext, type ReactNode } from "react";
import { ToastContext } from "./props/ExToastProps";

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ExToastProvider.");
  }

  return {
    show: context.show,
    success(
      description: string,
      title = "Success",
      duration = 3000,
      content: ReactNode,
    ) {
      context.show({
        title,
        description,
        duration,
        type: "success",
        content,
      });
    },
    error(
      description: string,
      title = "Error",
      duration = 3000,
      content: ReactNode,
    ) {
      context.show({
        title,
        description,
        duration,
        type: "danger",
        content,
      });
    },
    warning(
      description: string,
      title = "Warning",
      duration = 3000,
      content: ReactNode,
    ) {
      context.show({
        title,
        description,
        duration,
        type: "warning",
        content,
      });
    },
    info(
      description: string,
      title = "Information",
      duration = 3000,
      content: ReactNode,
    ) {
      context.show({
        title,
        description,
        duration,
        type: "info",
        content,
      });
    },
  };
}
