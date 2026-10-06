"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExUploadContext } from "./ExUploadContext";
import { Upload } from "lucide-react";
import { cn } from "../../utils/Utils";
import type { ExUploadProviderProps } from "./props/ExUploadProviderProps";
import ExButton from "../Button/ExButton";

export default function ExUploadProvider({
  uploadButton = false,
  children,
  onFiles,
}: ExUploadProviderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let dragCounter = 0;
    const isFileDrag = (e: DragEvent) =>
      e.dataTransfer?.types?.includes("Files");
    const handleDragEnter = (e: DragEvent) => {
      if (!isFileDrag(e)) return;
      e.preventDefault();
      dragCounter++;
      if (dragCounter === 1) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      if (!isFileDrag(e)) return;
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      if (!isFileDrag(e)) return;
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      if (!isFileDrag(e)) return;
      e.preventDefault();
      dragCounter = 0;
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer?.files ?? []);
      setFiles((prev) => [...prev, ...droppedFiles]);
      onFiles?.(droppedFiles);
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [onFiles]);

  const handlePickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected]);
    onFiles?.(selected);
  };

  return (
    <ExUploadContext.Provider
      value={{
        isDragging,
        files,
        setFiles,
      }}
    >
      {children}

      {uploadButton && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handlePickFiles}
          />
          <div className="fixed right-5 bottom-5">
            <ExButton
              type="button"
              size="lg"
              radius="full"
              iconOnly
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={18} />
            </ExButton>
          </div>
        </>
      )}

      {isDragging &&
        createPortal(
          <div className={cn("fixed inset-0 z-99999", "pointer-events-none")}>
            <div className="absolute inset-0 bg-primary/5" />
            <div className="flex h-full items-center justify-center p-5 backdrop-blur-[2px]">
              <div
                className={cn(
                  "pointer-events-auto",
                  "w-full h-full",
                  "rounded-3xl",
                  "border-2 border-dashed",
                  "border-muted/40",
                  "bg-transparent",
                  "px-5 py-10",
                  "flex flex-col items-center justify-center",
                )}
              >
                <div className="text-center">
                  <div className="text-xl font-medium text-muted/50">
                    Drop files to upload
                  </div>
                  <div className="mt-1 text-sm text-muted/50">
                    Files and folders are supported
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </ExUploadContext.Provider>
  );
}
