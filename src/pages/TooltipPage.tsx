import { CircleQuestionMark } from "lucide-react";
import ExBadge from "../lib/components/Badge/ExBadge";
import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExTooltip from "../lib/components/Tooltip/ExTooltip";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function TooltipPage() {
  const section: OnThisPage[] = [
    {
      name: "Introduction",
      link: "#intro",
    },
    {
      name: "Basic Usage",
      link: "#basic-usage",
    },
    {
      name: "Clickable",
      link: "#clickable",
    },
    {
      name: "Shortcut",
      link: "#shortcut",
    },
    {
      name: "Description",
      link: "#description",
    },
    {
      name: "Status",
      link: "#status",
    },
    {
      name: "Badge",
      link: "#badge",
    },
    {
      name: "Actions",
      link: "#actions",
    },
    {
      name: "Alignment",
      link: "#alignment",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h1 className="text-3xl font-semibold tracking-tight">Tooltip</h1>
          <p>
            Tooltips provide contextual information on hover or click. They can display simple text, rich UI content, status indicators,
            shortcuts, or interactive actions. Supports multiple placements and a <b>clickable mode</b> for persistent tooltips with
            outside-click dismissal.
          </p>
        </section>
        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Basic Usage (Hover)</h2>
            <p className="text-sm text-muted">Default behavior shows tooltip on hover with a short delay.</p>
          </div>
          <ExCanvas>
            <div className="flex justify-center py-10">
              <ExTooltip align="start" content="Open application settings">
               <CircleQuestionMark size={14}/>
              </ExTooltip>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExTooltip content="Open application settings">
  <ExButton variant="solid">Settings</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
        <section id="clickable" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Clickable Tooltip</h2>
            <p className="text-sm text-muted">
              Tooltips become interactive automatically when they contain buttons or interactive components.
            </p>
          </div>
          <ExCanvas>
            <div className="flex justify-center py-10">
              <ExTooltip
                clickable
                position="bottom"
                content={
                  <div className="space-y-2 p-1">
                    <p className="font-medium">Account Settings</p>
                    <ExButton variant="solid">Open Dashboard</ExButton>
                  </div>
                }>
                <ExButton variant="solid">Click Me</ExButton>
              </ExTooltip>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExTooltip
  clickable
  position="bottom"
  content={
    <div className="space-y-2 p-1">
      <p className="font-medium">Account Settings</p>
      <ExButton variant="solid">Open Dashboard</ExButton>
    </div>
  }
>
  <ExButton variant="solid">Click Me</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
        <section id="shortcut" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Keyboard Shortcut</h2>
            <p className="text-sm text-muted">Display shortcuts for power users and productivity workflows.</p>
          </div>
          <ExCanvas>
            <div className="flex justify-center py-10">
              <ExTooltip
                content={
                  <div className="flex items-center gap-3">
                    <span>Quick Search</span>
                    <div className="flex gap-1">
                      <kbd className="px-2 py-1 rounded border text-[10px]">⌘</kbd>
                      <kbd className="px-2 py-1 rounded border text-[10px]">K</kbd>
                    </div>
                  </div>
                }>
                <ExButton variant="solid">Search</ExButton>
              </ExTooltip>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExTooltip
  content={
    <div className="flex items-center gap-3">
      <span>Quick Search</span>
      <div className="flex gap-1">
        <kbd className="px-2 py-1 rounded border text-[10px]">
          ⌘
        </kbd>
        <kbd className="px-2 py-1 rounded border text-[10px]">
          K
        </kbd>
      </div>
    </div>
  }
>
  <ExButton variant="solid">Search</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
        <section id="description" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Detailed Description</h2>
            <p className="text-sm text-muted">Long-form explanations without cluttering the main UI.</p>
          </div>
          <ExCanvas>
            <div className="flex justify-center py-10">
              <ExTooltip
                position="top"
                content={
                  <div className="max-w-xs">
                    <div className="font-semibold">Auto Save</div>
                    <p className="text-xs opacity-80 mt-1 leading-relaxed">
                      Automatically stores changes in the background every few minutes to prevent data loss.
                    </p>
                  </div>
                }>
                <ExButton variant="solid">Auto Save</ExButton>
              </ExTooltip>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExTooltip
  position="top"
  content={
    <div className="max-w-xs">
      <div className="font-semibold">Auto Save</div>
      <p className="text-xs opacity-80 mt-1 leading-relaxed">
        Automatically stores changes in the background every few
        minutes to prevent data loss.
      </p>
    </div>
  }
>
  <ExButton variant="solid">Auto Save</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
        <section id="status" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Status Indicator</h2>
            <p className="text-sm text-muted">Combine badges and indicators inside tooltip content.</p>
          </div>
          <ExCanvas>
            <div className="flex justify-center py-10">
              <ExTooltip
                content={
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-green-500" />
                      <span className="font-medium">System Status</span>
                    </div>
                    <p className="text-xs opacity-75">All systems are functioning normally.</p>
                  </div>
                }>
                <ExButton variant="solid">Status</ExButton>
              </ExTooltip>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExTooltip
  content={
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-green-500" />
        <span className="font-medium">System Status</span>
      </div>
      <p className="text-xs opacity-75">
        All systems are functioning normally.
      </p>
    </div>
  }
>
  <ExButton variant="solid">Status</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
        <section id="badge" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Feature Badge</h2>
            <p className="text-sm text-muted">Highlight new features and product updates.</p>
          </div>
          <ExCanvas>
            <div className="flex justify-center py-10">
              <ExTooltip
                position="bottom"
                content={
                  <div className="space-y-2 p-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">AI Assistant</span>
                      <ExBadge color="success" size="sm" variant="soft">
                        NEW
                      </ExBadge>
                    </div>
                    <p className="text-xs opacity-80 max-w-60">
                      Generate content, summarize documents, and automate tasks directly in your workspace.
                    </p>
                  </div>
                }>
                <ExButton variant="solid">AI Features</ExButton>
              </ExTooltip>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExTooltip
  position="bottom"
  content={
    <div className="space-y-2 p-1">
      <div className="flex items-center gap-1.5">
        <span className="font-semibold">AI Assistant</span>
        <ExBadge color="success" size="sm" variant="soft">
          NEW
        </ExBadge>
      </div>
      <p className="text-xs opacity-80 max-w-60">
        Generate content, summarize documents, and automate tasks
        directly in your workspace.
      </p>
    </div>
  }
>
  <ExButton variant="solid">AI Features</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
        <section id="actions" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Interactive Actions</h2>
            <p className="text-sm text-muted">Tooltips containing actions automatically use clickable mode.</p>
          </div>
          <ExCanvas>
            <div className="flex justify-center py-10">
              <ExTooltip
                clickable
                position="bottom"
                content={
                  <div className="w-60 space-y-2 p-1">
                    <div>
                      <div className="font-semibold">Share Document</div>
                      <p className="text-xs opacity-70">Invite teammates to collaborate instantly.</p>
                    </div>
                    <div className="flex gap-2">
                      <ExButton size="xs" variant="outline">
                        Cancel
                      </ExButton>
                      <ExButton size="xs" variant="solid">
                        Share
                      </ExButton>
                    </div>
                  </div>
                }>
                <ExButton variant="solid">Share</ExButton>
              </ExTooltip>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExTooltip
  clickable
  position="bottom"
  content={
    <div className="w-60 space-y-2 p-1">
      <div>
        <div className="font-semibold">Share Document</div>
        <p className="text-xs opacity-70">
          Invite teammates to collaborate instantly.
        </p>
      </div>
      <div className="flex gap-2">
        <ExButton size="xs" variant="outline">
          Cancel
        </ExButton>
        <ExButton size="xs" variant="solid">
          Share
        </ExButton>
      </div>
    </div>
  }
>
  <ExButton variant="solid">Share</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
        <section id="alignment" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Alignment Variants</h2>
            <p className="text-sm text-muted">Tooltips support start, center, and end alignment for each placement.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <div className="flex gap-4">
                <ExTooltip content="Top Start" position="top" align="start">
                  <ExButton variant="text">Top Start</ExButton>
                </ExTooltip>

                <ExTooltip content="Top Center" position="top" align="center">
                  <ExButton variant="text">Top Center</ExButton>
                </ExTooltip>

                <ExTooltip content="Top End" position="top" align="end">
                  <ExButton variant="text">Top End</ExButton>
                </ExTooltip>
              </div>

              <div className="flex gap-4">
                <ExTooltip content="Bottom Start" position="bottom" align="start">
                  <ExButton variant="text">Bottom Start</ExButton>
                </ExTooltip>

                <ExTooltip content="Bottom Center" position="bottom" align="center">
                  <ExButton variant="text">Bottom Center</ExButton>
                </ExTooltip>

                <ExTooltip content="Bottom End" position="bottom" align="end">
                  <ExButton variant="text">Bottom End</ExButton>
                </ExTooltip>
              </div>

              <div className="flex gap-4">
                <ExTooltip content="Left Start" position="left" align="start">
                  <ExButton variant="text">Left Start</ExButton>
                </ExTooltip>

                <ExTooltip content="Left Center" position="left" align="center">
                  <ExButton variant="text">Left Center</ExButton>
                </ExTooltip>

                <ExTooltip content="Left End" position="left" align="end">
                  <ExButton variant="text">Left End</ExButton>
                </ExTooltip>
              </div>

              <div className="flex gap-4">
                <ExTooltip content="Right Start" position="right" align="start">
                  <ExButton variant="text">Right Start</ExButton>
                </ExTooltip>

                <ExTooltip content="Right Center" position="right" align="center">
                  <ExButton variant="text">Right Center</ExButton>
                </ExTooltip>

                <ExTooltip content="Right End" position="right" align="end">
                  <ExButton variant="text">Right End</ExButton>
                </ExTooltip>
              </div>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExTooltip content="Top Start" position="top" align="start">
  <ExButton variant="text">Top Start</ExButton>
</ExTooltip>

<ExTooltip content="Top Center" position="top" align="center">
  <ExButton variant="text">Top Center</ExButton>
</ExTooltip>

<ExTooltip content="Top End" position="top" align="end">
  <ExButton variant="text">Top End</ExButton>
</ExTooltip>

<ExTooltip content="Bottom Start" position="bottom" align="start">
  <ExButton variant="text">Bottom Start</ExButton>
</ExTooltip>

<ExTooltip content="Bottom Center" position="bottom" align="center">
  <ExButton variant="text">Bottom Center</ExButton>
</ExTooltip>

<ExTooltip content="Bottom End" position="bottom" align="end">
  <ExButton variant="text">Bottom End</ExButton>
</ExTooltip>

<ExTooltip content="Left Start" position="left" align="start">
  <ExButton variant="text">Left Start</ExButton>
</ExTooltip>

<ExTooltip content="Left Center" position="left" align="center">
  <ExButton variant="text">Left Center</ExButton>
</ExTooltip>

<ExTooltip content="Left End" position="left" align="end">
  <ExButton variant="text">Left End</ExButton>
</ExTooltip>

<ExTooltip content="Right Start" position="right" align="start">
  <ExButton variant="text">Right Start</ExButton>
</ExTooltip>

<ExTooltip content="Right Center" position="right" align="center">
  <ExButton variant="text">Right Center</ExButton>
</ExTooltip>

<ExTooltip content="Right End" position="right" align="end">
  <ExButton variant="text">Right End</ExButton>
</ExTooltip>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
