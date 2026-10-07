import {
  Code2,
  Music2,
  Table,
  TextInitial,
  Play,
  Presentation,
  Signature,
  LibraryBig,
  CircleQuestionMark,
} from "lucide-react";
import ExFileIcon from "./ExFileIcon";
import { useEffect, useMemo } from "react";
import { cn } from "../../utils/Utils";
import {
  EXT_MAP,
  fileColorMap,
  type FileType,
  type InputFile,
} from "./types/ExExplorerItemType";

function getExt(name: string) {
  return (name.split(".").pop() || "").toLowerCase();
}

function getType(file: InputFile): FileType {
  const mime = (file.type || "").toLowerCase();
  const ext = getExt(file.name);
  if (
    mime === "folder" ||
    mime === "directory" ||
    mime === "application/x-directory"
  ) {
    return "folder";
  }
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.includes("pdf")) return "pdf";
  if (mime.includes("spreadsheet") || mime.includes("excel"))
    return "spreadsheet";
  if (mime.includes("word")) return "document";
  if (mime.includes("powerpoint")) return "powerpoint";
  return EXT_MAP[ext] ?? "unknown";
}

function getIcon(type: FileType) {
  switch (type) {
    case "document":
      return <TextInitial size={23} strokeWidth={2.5} />;
    case "pdf":
      return <Signature size={23} strokeWidth={2.5} />;
    case "spreadsheet":
      return <Table size={23} strokeWidth={2.5} />;
    case "code":
      return <Code2 size={27} strokeWidth={2.5} />;
    case "audio":
      return <Music2 size={23} strokeWidth={3} />;
    case "powerpoint":
      return <Presentation size={23} strokeWidth={2.5} />;
    case "archive":
      return <LibraryBig size={23} strokeWidth={2.5} />;
    default:
      return <CircleQuestionMark size={23} strokeWidth={2.5} />;
  }
}

export function FileIcon({
  name,
  type,
  url,
  file,
  className,
}: {
  name: string;
  type: string;
  url?: string;
  file?: File;
  className?: string;
}) {
  const detected = useMemo(
    () =>
      getType({
        name: file?.name ?? name,
        type: file?.type ?? type,
      }),
    [file, name, type],
  );
  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return url;
  }, [file, url]);
  useEffect(() => {
    if (!file || !previewUrl) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);
  const showPreview =
    !!previewUrl && (detected === "image" || detected === "video");
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {showPreview ? (
        detected === "image" ? (
          <img
            src={previewUrl}
            alt={name}
            draggable={false}
            loading="lazy"
            className={cn("max-w-full max-h-full object-contain", className)}
            role="img"
          />
        ) : (
          <>
            <video
              src={previewUrl}
              preload="metadata"
              muted
              playsInline
              className={cn("max-w-full max-h-full object-contain", className)}
              aria-label={name}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div className="rounded-full bg-black/50 p-1">
                <Play size={14} fill="white" />
              </div>
            </div>
          </>
        )
      ) : (
        <ExFileIcon hexColor={fileColorMap[detected]} aria-hidden="true">
          {getIcon(detected)}
        </ExFileIcon>
      )}
    </div>
  );
}
