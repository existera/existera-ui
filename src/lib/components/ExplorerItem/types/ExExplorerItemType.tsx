export type MenuState = {
  open: boolean;
  x: number;
  y: number;
};

export type InputFile = {
  name: string;
  type: string;
  url?: string;
};
export type FileType =
  | "folder"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "spreadsheet"
  | "code"
  | "pdf"
  | "archive"
  | "powerpoint"
  | "unknown";

export const fileColorMap: Record<FileType, string> = {
  folder: "#F59E0B",
  image: "#EC4899",
  video: "#8B5CF6",
  audio: "#F472B6",
  document: "#2563EB",
  spreadsheet: "#16A34A",
  code: "#1F2937",
  pdf: "#EF4444",
  archive: "#EAB308",
  powerpoint: "#F97316",
  unknown: "#6B7280",
};

export const EXT_MAP: Record<string, FileType> = {
  pdf: "pdf",
  doc: "document",
  docx: "document",
  txt: "document",
  md: "document",
  xls: "spreadsheet",
  xlsx: "spreadsheet",
  csv: "spreadsheet",
  ppt: "powerpoint",
  pptx: "powerpoint",
  js: "code",
  ts: "code",
  jsx: "code",
  tsx: "code",
  json: "code",
  zip: "archive",
  rar: "archive",
  "7z": "archive",
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  mp4: "video",
  webm: "video",
  mov: "video",
  mp3: "audio",
  wav: "audio",
};
