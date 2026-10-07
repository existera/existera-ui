"use client";

import type { ExTableExpandProps } from "./props/ExTableProps";

export default function ExTableExpand({ children }: ExTableExpandProps) {
  return <div role="row">{children}</div>;
}