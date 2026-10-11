import { useState } from "react";
import ExKanban from "@/lib/components/Kanban/ExKanban";
import type { ExKanbanColumn, ExKanbanMove, ExKanbanCard } from "@/lib/components/Kanban/types/ExKanbanType";
import PageContent from "@/shared/documentation/PageContent";

const initialColumns: ExKanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "neutral",
    cards: [
      {
        id: "EX-101",
        title: "Workspace permissions",
        description: "Define access for owners, editors, and viewers.",
        labels: ["Security", "Platform"],
        assignee: "Alya",
        priority: "high",
      },
      {
        id: "EX-102",
        title: "Export activity reports",
        description: "Let teams download their monthly activity.",
        labels: ["Reporting"],
        assignee: "Bima",
        priority: "medium",
      },
      { id: "EX-103", title: "Improve empty states", labels: ["Design"], assignee: "Citra", priority: "low" },
    ],
  },
  {
    id: "progress",
    title: "In progress",
    color: "primary",
    cards: [
      {
        id: "EX-104",
        title: "Calendar experience",
        description: "Polish event rendering across daily, weekly, and monthly views.",
        labels: ["Calendar", "UI"],
        assignee: "Dimas",
        priority: "high",
      },
      { id: "EX-105", title: "Notification preferences", labels: ["Settings"], assignee: "Alya", priority: "medium" },
    ],
  },
  {
    id: "review",
    title: "In review",
    color: "warning",
    cards: [
      {
        id: "EX-106",
        title: "Accessible form controls",
        description: "Check keyboard navigation and validation announcements.",
        labels: ["Accessibility"],
        assignee: "Citra",
        priority: "high",
      },
    ],
  },
  { id: "done", title: "Done", color: "success", cards: [] },
];

export default function KanbanPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [output, setOutput] = useState<ExKanbanMove | ExKanbanCard | null>(null);
  return (
    <PageContent
      section={[
        { name: "Board", link: "#board" },
        { name: "Usage", link: "#usage" },
      ]}>
      <div className="min-w-0 space-y-8 text-foreground">
        <header className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Components / Workflow</p>
          <h1 className="text-3xl font-semibold tracking-tight">Kanban</h1>
          <p className="text-sm text-muted">Keep work moving. Organize priorities and move cards between stages.</p>
        </header>
        <section id="board" className="section-anchor min-w-0 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Product workspace</h2>
            <span className="text-xs text-muted">{columns.reduce((total, column) => total + column.cards.length, 0)} tasks</span>
          </div>
          <p className="text-xs text-muted">
            Drag anywhere on a card to reorder it or move it to another column. Keyboard: focus the card, press Space, use arrows, then
            Enter. Escape cancels.
          </p>
          <ExKanban
            columns={columns}
            onChange={(next, move) => {
              setColumns(next);
              setOutput(move);
            }}
            onCardClick={setOutput}
          />
          <p className="text-xs text-muted">Demo changes stay in memory.</p>
        </section>
        <section className="space-y-3 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold">Event output</h2>
          <pre aria-live="polite" className="ex-textarea-scroll max-h-72 overflow-auto rounded-lg bg-surface-2 p-4 text-xs">
            {output ? JSON.stringify(output, null, 2) : "Move or click a card to inspect its data."}
          </pre>
        </section>
        <section id="usage" className="section-anchor space-y-3">
          <h2 className="text-lg font-semibold">Usage</h2>
          <pre className="ex-textarea-scroll overflow-auto rounded-xl bg-surface-2 p-4 text-xs">
            {
              '<ExKanban\n  columns={columns}\n  size="md"\n  onChange={(next, move) => {\n    setColumns(next);\n    // Save next or move to your backend.\n  }}\n  onCardClick={(card) => console.log(card)}\n/>'
            }
          </pre>
          <p className="text-xs leading-relaxed text-muted">
            The board is controlled: update columns inside onChange. Sizes: sm, md, lg. Use disabled on the board, a column, or a card to
            prevent dragging. Without onChange the board is read-only. renderCard customizes card content; the entire card remains
            draggable. Card and column IDs must be unique within the board.
          </p>
        </section>
      </div>
    </PageContent>
  );
}
