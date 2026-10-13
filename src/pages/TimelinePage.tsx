import { Check, GitBranch, Package, Rocket } from "lucide-react";
import ExTimeline from "@/lib/components/Timeline/ExTimeline";
import type { ExTimelineItem } from "@/lib/components/Timeline/types/ExTimelineType";
import ExCodeBlock from "@/lib/components/CodeBlock/ExCodeBlock";
import PageContent from "@/shared/documentation/PageContent";

const events: ExTimelineItem[] = [
  {
    id: "created",
    title: "Release created",
    description: "A new release is ready for review.",
    time: "09:00",
    dateTime: "2026-10-11T09:00:00+07:00",
    icon: <GitBranch />,
  },
  {
    id: "reviewed",
    title: "Review completed",
    description: "All changes have been reviewed and approved.",
    time: "09:30",
    dateTime: "2026-10-11T09:30:00+07:00",
    icon: <Check />,
    color: "success",
  },
  {
    id: "built",
    title: "Package built",
    description: "Production assets are ready to deploy.",
    time: "09:45",
    dateTime: "2026-10-11T09:45:00+07:00",
    icon: <Package />,
    color: "warning",
    content: <div className="w-fit rounded-md border border-border bg-surface-3 py-1 px-2">Version 1.0.0 · Build successful</div>,
  },
  {
    id: "released",
    title: "Deployed to production",
    description: "The release is available to everyone.",
    time: "10:00",
    dateTime: "2026-10-11T10:00:00+07:00",
    icon: <Rocket />,
    color: "success",
  },
];

export default function TimelinePage() {
  return (
    <PageContent
      section={[
        { name: "Activity", link: "#activity" },
        { name: "Alternating", link: "#alternating" },
        { name: "Sizes", link: "#sizes" },
        { name: "Usage", link: "#usage" },
      ]}>
      <div className="min-w-0 space-y-10 text-foreground">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Timeline</h1>
          <p className="text-sm text-muted">Display activity, milestones, and event history in chronological order.</p>
        </header>
        <section id="activity" className="section-anchor space-y-5">
          <h2 id="activity-heading" className="text-xl font-semibold">
            Release activity
          </h2>
          <div className="rounded-xl border border-border bg-surface p-5">
            <ExTimeline items={events} aria-labelledby="activity-heading" />
          </div>
        </section>
        <section id="alternating" className="section-anchor space-y-5">
          <h2 id="alternating-heading" className="text-xl font-semibold">
            Alternating layout
          </h2>
          <p className="text-sm text-muted">Events alternate on larger screens and stack on smaller screens.</p>
          <ExTimeline items={events} align="alternate" aria-labelledby="alternating-heading" />
        </section>
        <section id="sizes" className="section-anchor space-y-5">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {(["xs", "sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="mb-5 text-sm font-semibold uppercase">{size}</h3>
                <ExTimeline
                  size={size}
                  color="secondary"
                  aria-label={`${size} timeline`}
                  items={[
                    { id: "opened", title: "Issue opened", description: "The team received your report." },
                    { id: "resolved", title: "Issue resolved", description: "The fix is now available.", color: "success" },
                  ]}
                />
              </div>
            ))}
          </div>
        </section>
        <section id="usage" className="section-anchor space-y-5">
          <h2 className="text-xl font-semibold">Usage</h2>
          <ExCodeBlock language="tsx">
            {
              'import { ExTimeline } from "@existera/ui";\n\n<ExTimeline\n  size="md"\n  color="primary"\n  align="start"\n  items={[\n    { id: "created", title: "Order created", time: "09:00" },\n    { id: "shipped", title: "Order shipped", color: "success" },\n  ]}\n/>'
            }
          </ExCodeBlock>
          <p className="text-sm text-muted">
            Items render in the supplied order. Use a stable id for each event. Optional fields: description, time, dateTime, icon, color,
            and content. Sizes: xs, sm, md, lg. Colors: primary, secondary, success, warning, danger.
          </p>
        </section>
      </div>
    </PageContent>
  );
}
