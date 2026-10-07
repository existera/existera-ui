"use client";

import { createContext, useContext } from "react";
import type { ExUploadContextValue } from "./props/ExUploadContextValueProps";

export const ExUploadContext = createContext<ExUploadContextValue>({
  isDragging: false,
  files: [],
  setFiles: () => {},
});

export default function useExUpload() {
  return useContext(ExUploadContext);
}
