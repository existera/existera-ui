"use client";

import type { ReactNode } from "react";

export default function ExTableFooter({ children }: { children?: ReactNode }) {
    return (
        <div role="rowgroup" aria-label="Table footer">
            {children}
        </div>
    );
}