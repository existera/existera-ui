"use client";

import { ChangeEvent, useRef, useImperativeHandle } from "react";
import { FileText, Trash2, Upload } from "lucide-react";

import { ExFilePickerProps } from "./props/ExFilePickerProps";

export default function ExFilePicker({
  id,
  ref,
  onChange,
  accept,
  multiple = false,
  disabled = false,
  file,
  maxSize,
  onFileSelect,
  onRemove,
}: ExFilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  const hasFile = !!file;
  const fileName = typeof File !== "undefined" && file instanceof File ? file.name : file?.name;
  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = event.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);
    const validFiles = maxSize
      ? selectedFiles.filter((file) => file.size <= maxSize)
      : selectedFiles;
    if (validFiles.length > 0) {
      (onChange ?? onFileSelect)?.(validFiles);
    }
    event.target.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="hidden"
      />

      <div
        onClick={handleClick}
        className={`
          select-none
          w-full overflow-hidden rounded-md border border-dashed border-border
          bg-surface-2 p-4 transition-colors
          hover:border-primary hover:bg-primary/5
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        `}
      >
        {hasFile ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-7 w-7 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-left text-sm font-semibold text-foreground">
                {fileName}
              </p>

              <p className="text-left text-sm text-muted">
                {file?.size ? formatFileSize(file.size) : "-"}
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (onChange) onChange([]); else onRemove?.();
              }}
              disabled={disabled}
              className="
                inline-flex h-9 w-9 shrink-0 items-center justify-center
                rounded-md border border-border
                text-danger transition-colors
                hover:bg-danger/10
                disabled:pointer-events-none disabled:opacity-50
                hover:cursor-pointer
              "
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-left text-sm font-semibold text-foreground">
                Click or drag to upload files
              </p>

              {accept && (
                <p className="mt-1 text-left text-xs text-muted">
                  Supported: {accept}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
