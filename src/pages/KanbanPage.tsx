import { useState } from "react";
import ExKanban from "@/lib/components/Kanban/ExKanban";
import ExKanbanColumn from "@/lib/components/Kanban/ExKanbanColumn";
import ExKanbanCard from "@/lib/components/Kanban/ExKanbanCard";
import type { ExKanbanMove, ExKanbanCard as CardData } from "@/lib/components/Kanban/types/ExKanbanType";
import PageContent from "@/shared/documentation/PageContent";

const example = `<ExKanban onChange={(columns, move) => console.log(move)}>
  <ExKanbanColumn id="todo" title="To do"
    header={<h3 className="font-semibold">📋 To do</h3>}>
    <ExKanbanCard id="task-1" title="Design homepage">
      <h4 className="font-semibold">Design homepage</h4>
      <p>Isi kartu bebas menggunakan JSX.</p>
      <span className="text-primary">Design team</span>
    </ExKanbanCard>
  </ExKanbanColumn>
  <ExKanbanColumn id="done" title="Done"
    header={<strong>✓ Done</strong>} />
</ExKanban>`;

export default function KanbanPage() {
  const [output, setOutput] = useState<ExKanbanMove | CardData | null>(null);
  return (
    <PageContent
      section={[
        { name: "Board", link: "#board" },
        { name: "Usage", link: "#usage" },
      ]}>
      <div className="min-w-0 space-y-8 text-foreground">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Kanban</h1>
          <p className="text-sm text-muted">Compose your own column headers and card content with JSX.</p>
        </header>
        <section id="board" className="section-anchor min-w-0 space-y-4">
          <p className="text-xs text-muted">
            Hold and drag empty board space or a column header to scroll horizontally. Drag a card to move it.
            Keyboard: focus the card, Space to pick up, arrows to move, Enter to drop, Escape to cancel.
          </p>

          <ExKanban onChange={(_, move) => setOutput(move)} onCardClick={setOutput}>
            <ExKanbanColumn
              id="backlog"
              title="Backlog"
              header={
                <div className="flex w-full items-center justify-between">
                  <h3 className="font-semibold">Backlog</h3>
                  <span className="rounded bg-surface-3 px-2 py-1 text-[10px]">Ideas & requests</span>
                </div>
              }>
              <ExKanbanCard id="EX-101" title="Workspace permissions">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-danger">High priority</span>
                  <h4 className="font-semibold">Workspace permissions</h4>
                  <p className="text-xs text-muted">Define access for owners, editors, and viewers.</p>
                  <div className="flex justify-between border-t border-border pt-3 text-xs">
                    <span>Security</span>
                    <strong>Alya</strong>
                  </div>
                </div>
              </ExKanbanCard>
              <ExKanbanCard id="EX-102" title="Export reports">
                <h4 className="font-semibold">Export activity reports</h4>
                <p className="mt-2 text-xs text-muted">CSV exports for the operations team.</p>
                <div className="mt-4 rounded-lg bg-primary-soft p-3 text-xs text-primary">Reporting · Q4 release</div>
              </ExKanbanCard>
            </ExKanbanColumn>

            <ExKanbanColumn
              id="progress"
              title="In progress"
              header={
                <div>
                  <h3 className="font-semibold text-primary">In progress</h3>
                  <p className="text-[10px] text-muted">Currently being built</p>
                </div>
              }>
              <ExKanbanCard id="EX-103" title="Calendar experience">
                <h4 className="font-semibold">Calendar experience</h4>
                <p className="my-3 text-xs text-muted">Polish event layouts across all views.</p>
                <label className="text-xs">
                  Completion
                  <progress className="mt-2 block h-2 w-full accent-primary" value={65} max={100} />
                </label>
              </ExKanbanCard>
              <ExKanbanCard id="EX-104" title="Notification settings">
                <h4 className="font-semibold">Notification preferences</h4>
                <div className="mt-3 flex gap-2">
                  <span className="rounded bg-warning-soft px-2 py-1 text-[10px] text-warning">Settings</span>
                  <span className="rounded bg-surface-3 px-2 py-1 text-[10px]">Bima</span>
                </div>
              </ExKanbanCard>
            </ExKanbanColumn>

            <ExKanbanColumn id="review" title="Review" header={<h3 className="font-semibold text-warning">Review & QA</h3>}>
              <ExKanbanCard id="EX-105" title="Accessibility review">
                <h4 className="font-semibold">Accessibility review</h4>
                <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-muted">
                  <li>Keyboard navigation</li>
                  <li>Screen-reader labels</li>
                  <li>Color contrast</li>
                </ul>
              </ExKanbanCard>
            </ExKanbanColumn>

            <ExKanbanColumn
              id="done"
              title="Done"
              header={
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-success" />
                  <h3 className="font-semibold text-success">Done</h3>
                </div>
              }
            />
          </ExKanban>
        </section>
        <section className="space-y-3 rounded-xl border border-border p-5">
          <h2 className="text-sm font-semibold">Event output</h2>
          <pre aria-live="polite" className="ex-textarea-scroll max-h-72 overflow-auto rounded-lg bg-surface-2 p-4 text-xs">
            {output ? JSON.stringify(output, null, 2) : "Move or click a card to inspect its data."}
          </pre>
        </section>
        <section id="usage" className="section-anchor space-y-3">
          <h2 className="text-lg font-semibold">Composable usage</h2>
          <pre className="ex-textarea-scroll overflow-auto rounded-xl bg-surface-2 p-4 text-xs">{example}</pre>
          <p className="text-xs leading-relaxed text-muted">
            Use header for custom column markup and children for the entire card content. Provide unique IDs and a title for accessible
            announcements. JSX mode manages card order internally; onChange reports the new order and move data. Pass columns for a
            controlled board. No HTML is stored in the output data. Interactive controls inside custom content retain their normal behavior.
          </p>
        </section>
      </div>
    </PageContent>
  );
}
