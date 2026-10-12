import { useState } from "react";
import { CloudSun, Plus, RotateCcw, LockKeyhole, UnlockKeyhole } from "lucide-react";
import { ExButton, ExCodeBlock, ExWidgetCard, ExWidgetContainer } from "../lib";
import type { ExWidgetLayout } from "../lib";
import PageContent from "../shared/documentation/PageContent";

const initialLayout: ExWidgetLayout = [
  { id: "weather", x: 0, y: 0, w: 2, h: 1 },
  { id: "focus", x: 2, y: 0, w: 2, h: 1 },
  { id: "notes", x: 0, y: 1, w: 2, h: 2, minH: 1, maxH: 3 },
  { id: "tasks", x: 2, y: 1, w: 2, h: 1 },
  { id: "activity", x: 2, y: 2, w: 2, h: 1 },
];

const example = `import { useState } from "react";
import { ExWidgetContainer, ExWidgetCard } from "@existera/ui";
import type { ExWidgetLayout } from "@existera/ui";

export default function Dashboard() {
  const [layout, setLayout] = useState<ExWidgetLayout>([
    { id: "notes", x: 0, y: 0, w: 2, h: 2, minW: 1, maxH: 3 },
    { id: "weather", x: 2, y: 0, w: 2, h: 1 },
  ]);
  return (
    <ExWidgetContainer columns={4} rowHeight={160} gap={12}
      layout={layout} onLayoutChange={setLayout}>
      <ExWidgetCard widgetId="notes" title="Notes">
        <textarea aria-label="Notes" placeholder="Write something…" />
      </ExWidgetCard>
      <ExWidgetCard widgetId="weather" title="Weather">
        <p>28° · Partly cloudy</p>
      </ExWidgetCard>
    </ExWidgetContainer>
  );
}`;

export default function WidgetPage() {
  const [layout, setLayout] = useState(initialLayout);
  const [editable, setEditable] = useState(true);
  const [count, setCount] = useState(3);
  const [saved, setSaved] = useState("");

  return (
    <PageContent section={[{ name: "Introduction", link: "#intro" }, { name: "Playground", link: "#playground" },
      { name: "Usage", link: "#usage" }, { name: "API", link: "#api" }]}>
      <div className="flex min-w-0 flex-col gap-12">
        <section id="intro" className="section-anchor grid gap-2">
          <h2 className="text-3xl font-semibold">Widget</h2>
          <p>A home for your widgets. Arrange cards on a responsive grid, move them by their handles, and resize them from the corner.</p>
        </section>
        <section id="playground" className="section-anchor grid min-w-0 gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h3 className="text-2xl font-semibold">Your space</h3><p className="text-sm text-muted">Hover over a card to arrange it your way.</p></div>
            <div className="flex flex-wrap gap-2">
              <ExButton variant="soft" color="secondary" onClick={() => setEditable(!editable)} leftIcon={editable ? <LockKeyhole size={15} /> : <UnlockKeyhole size={15} />}>
                {editable ? "Lock layout" : "Edit layout"}
              </ExButton>
              <ExButton variant="soft" color="secondary" leftIcon={<RotateCcw size={15} />} onClick={() => { setLayout(initialLayout); setSaved(""); }}>Reset</ExButton>
              <ExButton onClick={() => {
                try { localStorage.setItem("existera-widget-demo", JSON.stringify(layout)); setSaved("Layout saved in this browser."); }
                catch { setSaved("Browser storage is unavailable."); }
              }}>Save layout</ExButton>
              <ExButton variant="soft" onClick={() => {
                try {
                  const value: unknown = JSON.parse(localStorage.getItem("existera-widget-demo") ?? "null");
                  if (Array.isArray(value) && value.length === initialLayout.length && new Set(value.map((item) => item?.id)).size === value.length
                    && value.every((item) => item && initialLayout.some((original) => original.id === item.id)
                      && [item.x, item.y, item.w, item.h].every(Number.isFinite))) {
                    setLayout(value); setSaved("Saved layout restored.");
                  } else setSaved("No saved layout found.");
                } catch { setSaved("Saved layout could not be restored."); }
              }}>Restore</ExButton>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-surface-2 p-3 sm:p-5">
            <ExWidgetContainer aria-label="Personal dashboard" layout={layout} onLayoutChange={setLayout} columns={4}
              minColumnWidth={120} rowHeight={160} editable={editable}>
              <ExWidgetCard widgetId="weather" title="Weather" className="bg-primary-soft border-primary/15">
                <div className="flex items-center justify-between gap-3"><div><p className="text-4xl font-semibold tracking-tight">28°</p><p className="mt-1 text-sm text-muted">Jakarta · Partly cloudy</p></div><CloudSun size={42} className="shrink-0 text-primary" /></div>
              </ExWidgetCard>
              <ExWidgetCard widgetId="focus" title="Daily focus">
                <p className="text-3xl font-semibold tracking-tight">Make room.</p><p className="mt-2 text-sm text-muted">For the things that matter today.</p>
              </ExWidgetCard>
              <ExWidgetCard widgetId="notes" title="Quick notes" className="bg-warning-soft border-warning/15">
                <textarea aria-label="Quick notes" className="h-full min-h-12 w-full resize-none bg-transparent text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-warning rounded"
                  placeholder="A thought, a plan, a little reminder…" defaultValue={"Ideas for today\n\n• Keep it simple\n• Build something useful\n• Take a little break"} />
              </ExWidgetCard>
              <ExWidgetCard widgetId="tasks" title="Small wins">
                <div className="flex items-center justify-between gap-2"><div><p className="text-3xl font-semibold">{count}</p><p className="text-sm text-muted">Tasks completed</p></div>
                  <ExButton aria-label="Complete a task" iconOnly variant="soft" onClick={() => setCount(count + 1)}><Plus size={18} /></ExButton></div>
              </ExWidgetCard>
              <ExWidgetCard widgetId="activity" title="This week">
                <div className="flex h-14 items-end gap-2" role="img" aria-label="Weekly activity: increasing toward the weekend">
                  {[35, 55, 40, 75, 60, 95, 70].map((value, index) => <div key={index} className="flex-1 rounded-t bg-success/65" style={{ height: `${value}%` }} />)}
                </div><p className="mt-2 text-xs text-muted">A little progress every day.</p>
              </ExWidgetCard>
            </ExWidgetContainer>
          </div>
          <p role="status" className="text-sm text-muted">{saved || "Drag the top handle to move. Pull the bottom-right corner to resize. Follow the highlighted destination, then release to snap into place."}</p>
        </section>
        <section id="usage" className="section-anchor grid min-w-0 gap-4">
          <h3 className="text-2xl font-semibold">Usage</h3>
          <ExCodeBlock language="tsx">{example}</ExCodeBlock>
          <p className="text-sm text-muted">Use defaultLayout for uncontrolled layouts, or layout and onLayoutChange to manage and persist positions yourself.
            Pass ExWidgetCard elements directly as children, with unique widgetId values matching the layout IDs.</p>
        </section>
        <section id="api" className="section-anchor grid gap-4">
          <h3 className="text-2xl font-semibold">API & interaction</h3>
          <div className="overflow-x-auto"><table className="w-full text-left text-sm">
            <thead><tr className="border-b border-border"><th className="p-3">Component / property</th><th className="p-3">Behavior</th></tr></thead>
            <tbody>{[
              ["Container · columns / rowHeight / gap", "Defaults: 4 columns, 160px rows, 12px gap."],
              ["Container · minColumnWidth", "Default 150px. Fewer columns fit narrow containers; cards wrap and shrink to fit."],
              ["Container · editable", "Default true. Set false to hide all layout controls."],
              ["Container · onLayoutChange", "Emits the full layout on drop, resize completion, or an arrow-key step. Cancelled gestures do not emit."],
              ["Layout · x / y / w / h", "Zero-based column and row; width and height in cells. Collisions push other cards down."],
              ["Layout · minW / minH / maxW / maxH", "Optional size bounds in cells. Available columns take precedence over minimum width."],
              ["Card · title / actions / children", "Header title, header actions, and scrollable widget content."],
              ["Card · draggable / resizable", "Default true. Enable or hide each handle independently."],
              ["Card · moveLabel / resizeLabel", "Custom accessible labels for the two handles."],
              ["Keyboard", "Tab to a handle, then use arrow keys to move or resize by one cell. Escape cancels a drag."],
            ].map(([name, description]) => <tr key={name} className="border-b border-border"><td className="p-3 font-medium">{name}</td><td className="p-3 text-muted">{description}</td></tr>)}</tbody>
          </table></div>
          <p className="text-sm text-muted">Responsive reflow alone does not overwrite your stored layout. Editing at a narrower width emits that width’s layout.
            For independent layouts per breakpoint, store a separate layout for each breakpoint. Resizing the container during a gesture cancels that gesture.</p>
        </section>
      </div>
    </PageContent>
  );
}
