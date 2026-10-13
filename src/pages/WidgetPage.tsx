import { useState } from "react";
import { CloudSun, Plus, Sparkles } from "lucide-react";
import { ExButton, ExCodeBlock, ExWidgetCard, ExWidgetContainer } from "../lib";
import type { ExWidgetLayout } from "../lib";
import PageContent from "../shared/documentation/PageContent";

const initialLayout: ExWidgetLayout = [
  { id: "weather", col: 0, row: 0, colSpan: 4, rowSpan: 2 },
  { id: "focus", col: 4, row: 0, colSpan: 2, rowSpan: 2 },
  { id: "shortcut", col: 6, row: 0, colSpan: 1, rowSpan: 1 },
  { id: "notes", col: 0, row: 2, colSpan: 4, rowSpan: 4 },
  { id: "tasks", col: 4, row: 2, colSpan: 2, rowSpan: 2 },
  { id: "activity", col: 4, row: 4, colSpan: 4, rowSpan: 2 },
];

const cardDesign =
  "rounded-lg border border-border bg-surface text-foreground shadow-sm [&>[data-widget-content]]:m-3 [&>[data-widget-content]]:pr-1 [&>[data-widget-content]]:mb-6";
const example = `const [layout, setLayout] = useState<ExWidgetLayout>([
  { id: "notes", row: 0, col: 0, rowSpan: 2, colSpan: 2 },
  { id: "weather", row: 0, col: 2, rowSpan: 2, colSpan: 4 },
]);

<ExWidgetContainer columns={12} rows={4} gap={8}
  breakpoints={{ 0: 2, 480: 6, 768: 8, 1024: 12 }}
  layout={layout} onLayoutChange={setLayout}>
  <ExWidgetCard widgetId="notes" minRow={1} maxRow={4}
    minCol={1} maxCol={4}
    className="rounded-xl border bg-surface
      [&>[data-widget-content]]:m-3">
    <h3>My notes</h3>
    <p>All content and visual design are yours.</p>
  </ExWidgetCard>
  <ExWidgetCard widgetId="weather" minRow={2} maxRow={4}
    minCol={2} maxCol={6} className="rounded-xl bg-primary-soft">
    <div className="p-4">28° · Partly cloudy</div>
  </ExWidgetCard>
</ExWidgetContainer>`;

export default function WidgetPage() {
  const [layout, setLayout] = useState(initialLayout);
  const [editable, setEditable] = useState(true);
  const [columns, setColumns] = useState(8);
  const [rows, setRows] = useState(10);
  const [wins, setWins] = useState(3);
  const [notice, setNotice] = useState("");
  return (
    <PageContent
      section={[
        { name: "Introduction", link: "#intro" },
        { name: "Playground", link: "#playground" },
        { name: "Usage", link: "#usage" },
        { name: "API", link: "#api" },
      ]}>
      <div className="flex min-w-0 flex-col gap-12">
        <section id="intro" className="section-anchor grid gap-2">
          <h2 className="text-3xl font-semibold">Widget grid</h2>
          <p>A responsive square grid with headless, movable, resizable cards. Build your own dashboard design.</p>
        </section>
        <section id="playground" className="section-anchor grid min-w-0 gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold">Your space</h3>
              <p className="text-sm text-muted">A few little things, arranged your way.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                Columns
                <select
                  aria-label="Maximum columns"
                  className="rounded border border-border bg-surface p-1"
                  value={columns}
                  onChange={(event) => setColumns(Number(event.target.value))}>
                  {[4, 6, 8, 12].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
              <ExButton variant="soft" color="secondary" onClick={() => setEditable(!editable)}>
                {editable ? "Lock" : "Edit"}
              </ExButton>
              <label className="flex items-center gap-2 text-sm">
                Rows
                <select aria-label="Row divisions" className="rounded border border-border bg-surface p-1" value={rows} onChange={(event) => setRows(Number(event.target.value))}>
                  {[4, 6, 8, 10, 12, 16].map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
              <ExButton
                variant="soft"
                color="secondary"
                onClick={() => {
                  setLayout(initialLayout);
                  setNotice("");
                }}>
                Reset
              </ExButton>
              <ExButton
                onClick={() => {
                  try {
                    localStorage.setItem("existera-widget-grid-v2", JSON.stringify(layout));
                    setNotice("Layout saved in this browser.");
                  } catch {
                    setNotice("Browser storage is unavailable.");
                  }
                }}>
                Save
              </ExButton>
              <ExButton
                variant="soft"
                onClick={() => {
                  try {
                    const value: unknown = JSON.parse(localStorage.getItem("existera-widget-grid-v2") ?? "null");
                    if (
                      Array.isArray(value) &&
                      value.length === initialLayout.length &&
                      new Set(value.map((item) => item?.id)).size === value.length &&
                      value.every(
                        (item) =>
                          item &&
                          initialLayout.some((entry) => entry.id === item.id) &&
                          [item.row, item.col, item.rowSpan, item.colSpan].every(Number.isFinite),
                      )
                    ) {
                      setLayout(value);
                      setNotice("Saved layout restored.");
                    } else setNotice("No saved layout found.");
                  } catch {
                    setNotice("Saved layout could not be restored.");
                  }
                }}>
                Restore
              </ExButton>
            </div>
          </div>
          <div className="min-w-0">
            <ExWidgetContainer
              aria-label="Personal dashboard"
              columns={columns}
              rows={rows}
              gap={20}
              layout={layout}
              onLayoutChange={setLayout}
              editable={editable}>
              <ExWidgetCard
                widgetId="weather"
                minCol={1}
                maxCol={6}
                minRow={1}
                maxRow={4}
                className={`${cardDesign} bg-primary-soft border-primary/15`}>
                <h3 className="text-xs font-medium text-muted">Weather</h3>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-3xl font-semibold">28°</p>
                    <p className="text-xs text-muted">Jakarta · Partly cloudy</p>
                  </div>
                  <CloudSun size={32} className="shrink-0 text-primary" />
                </div>
              </ExWidgetCard>
              <ExWidgetCard widgetId="focus" minCol={1} maxCol={4} minRow={1} maxRow={4} className={cardDesign}>
                <h3 className="text-xs font-medium text-muted">Daily focus</h3>
                <p className="mt-2 text-xl font-semibold">Make room.</p>
                <p className="mt-1 text-xs text-muted">For what matters today.</p>
              </ExWidgetCard>

              <ExWidgetCard
                widgetId="shortcut"
                minCol={1}
                maxCol={2}
                minRow={1}
                maxRow={2}
                className="rounded-xl bg-primary-soft text-primary [&>[data-widget-content]]:grid [&>[data-widget-content]]:place-items-center">
                <Sparkles aria-label="One grid cell" size={20} />
              </ExWidgetCard>

              <ExWidgetCard
                widgetId="notes"
                minCol={2}
                maxCol={6}
                minRow={2}
                maxRow={6}
                className={`${cardDesign} bg-warning-soft border-warning/15`}>
                <h3 className="mb-3 text-sm font-medium">Little reminders</h3>
                <div className="space-y-4 text-sm leading-relaxed">
                  {[
                    "Keep it simple",
                    "Build something useful",
                    "Take a little break",
                    "Sketch a fresh idea",
                    "Review the small details",
                    "Make time for a walk",
                    "Read a chapter",
                    "Plan tomorrow",
                    "Celebrate a small win",
                    "Write down what you learned",
                  ].map((note) => (
                    <label key={note} className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1 shrink-0 accent-warning" />
                      <span>{note}</span>
                    </label>
                  ))}
                </div>
              </ExWidgetCard>

              <ExWidgetCard widgetId="tasks" minCol={1} maxCol={4} minRow={1} maxRow={4} className={cardDesign}>
                <h3 className="text-xs font-medium text-muted">Small wins</h3>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-3xl font-semibold">{wins}</p>
                  <ExButton aria-label="Complete a task" iconOnly variant="soft" onClick={() => setWins(wins + 1)}>
                    <Plus size={16} />
                  </ExButton>
                </div>
              </ExWidgetCard>

              <ExWidgetCard widgetId="activity" minCol={2} maxCol={8} minRow={1} maxRow={4} className={cardDesign}>
                <h3 className="mb-2 text-xs font-medium text-muted">This week</h3>
                <div className="flex h-12 items-end gap-2" role="img" aria-label="Weekly activity">
                  {[35, 55, 40, 75, 60, 95, 70].map((value, index) => (
                    <div key={index} className="flex-1 rounded-t bg-success/65" style={{ height: `${value}%` }} />
                  ))}
                </div>
              </ExWidgetCard>
            </ExWidgetContainer>
          </div>
          <p role="status" className="text-sm text-muted">
            {notice ||
              "Drag the top-right handle to move. Pull the bottom-right corner to resize. Square and rectangular cards share the same square grid."}
          </p>
        </section>
        <section id="usage" className="section-anchor grid min-w-0 gap-4">
          <h3 className="text-2xl font-semibold">Usage</h3>
          <ExCodeBlock language="tsx">{example}</ExCodeBlock>
          <p className="text-sm text-muted">
            Use defaultLayout for uncontrolled state. ExWidgetCard must be a direct child with a unique widgetId. Without a layout entry,
            rowSpan and colSpan on the card provide its initial size.
          </p>
        </section>
        <section id="api" className="section-anchor grid gap-4">
          <h3 className="text-2xl font-semibold">Layout & constraints</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-3">Property</th>
                  <th className="p-3">Behavior</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["columns / rows / gap", "Defaults: 12 maximum columns, 4 minimum row divisions, 8px gap. Desktop has a square workspace; mobile height follows the rows. Existing content can require more rows; gestures cannot exceed the current capacity."],
                  [
                    "responsive / breakpoints",
                    "Responsive by default: 2 columns below 480px fill the available width, 6 from 480px, 8 from 768px, 12 from 1024px, capped by columns. Based on container space.",
                  ],
                  [
                    "Square units",
                    "Desktop: unit = (container side − (N − 1) × gap) / N, where N = max(effective columns, effective rows). Mobile: unit = (available width − total column gaps) / columns; more rows increase height. Cells remain square in both modes.",
                  ],
                  [
                    "row / col / rowSpan / colSpan",
                    "Zero-based coordinates and integer spans. Equal spans form squares. A 2×2 card covers four units plus their internal gaps.",
                  ],
                  [
                    "minRow / maxRow / minCol / maxCol",
                    "Card span constraints; defaults are 1 to available columns and unbounded rows. The available column count takes precedence over minCol on narrow screens. Conflicting maximums are raised to the minimum.",
                  ],
                  [
                    "draggable / resizable / editable",
                    "The first two are per-card flags; editable=false disables both throughout the container.",
                  ],
                  [
                    "className / style / children",
                    "All decoration comes from your app. The card only supplies structural layout, scrolling, and minimal handles.",
                  ],
                  [
                    "data-widget-content",
                    "Target this scroll viewport in your className to add margins around a small scrollbar. Let content grow naturally; avoid nested fixed-height scrollers.",
                  ],
                  [
                    "dragHandleClassName / resizeHandleClassName",
                    "Customize the handles. moveLabel and resizeLabel customize their accessible names.",
                  ],
                  [
                    "onLayoutChange(layout, change)",
                    "Called on committed pointer or keyboard changes. Metadata includes effective columns, rows, action, and widgetId. Escape and responsive reflow do not overwrite saved state.",
                  ],
                  [
                    "Mouse, touch & keyboard",
                    "Pointer capture supports mouse and touch. Arrow keys move/resize a focused handle by one unit. Escape cancels. Content stays interactive.",
                  ],
                ].map(([property, description]) => (
                  <tr key={property} className="border-b border-border">
                    <td className="p-3 font-medium">{property}</td>
                    <td className="p-3 text-muted">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted">
            Viewport changes normalize positions and spans without changing the stored layout. Edits at a narrow breakpoint save that
            layout; keep separate controlled layouts if you need independent arrangements per breakpoint. Grid configuration changes cancel
            an active gesture.
          </p>
        </section>
      </div>
    </PageContent>
  );
}
