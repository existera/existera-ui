import { useState } from "react";
import { Home, Settings, User } from "lucide-react";
import ExButtonGroup from "../lib/components/ButtonGroup/ExButtonGroup";
import ExButtonGroupItem from "../lib/components/ButtonGroup/ExButtonGroupItem";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import { ExButton } from "@/lib";

export default function ButtonGroupPage() {
  const [view, setView] = useState("overview");
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Active state", link: "#active-state" },
    { name: "Responsive", link: "#responsive" },
    { name: "Variant", link: "#variant" },
    { name: "Color", link: "#color" },
    { name: "Radius", link: "#radius" },
    { name: "Size", link: "#size" },
    { name: "Icon", link: "#icon" },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Button Group</h2>
          <p>
            Button Group organizes multiple related buttons into a single horizontal control. It provides consistent spacing, shared
            borders, and unified styling, making it ideal for grouped actions, segmented controls, or option selection.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Wrap multiple <code>ExButtonGroupItem</code> components inside <code>ExButtonGroup</code> to create a visually connected set
              of buttons. Each item behaves as an individual button while sharing a unified appearance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-full max-w-100 min-w-0 gap-3">
              <ExButtonGroup>
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButtonGroup>
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>`}
          </ExCodeBlock>
        </section>

        <section id="active-state" className="grid gap-4 section-anchor">
          <h3 className="text-2xl font-semibold">Active state</h3>
          <p>
            Use a unique value on each item. The group supports controlled value/onValueChange or uncontrolled defaultValue. Re-selecting
            the active item does not emit another change.
          </p>
          <ExCanvas>
            <div className="grid w-full min-w-0 gap-4">
              <ExButtonGroup aria-label="Dashboard view" value={view} onValueChange={setView} fit={false}>
                <ExButtonGroupItem value="overview" leftIcon={<Home size={16} />}>
                  Overview
                </ExButtonGroupItem>
                <ExButtonGroupItem value="members" leftIcon={<User size={16} />}>
                  Members
                </ExButtonGroupItem>
                <ExButtonGroupItem value="settings" leftIcon={<Settings size={16} />}>
                  Settings
                </ExButtonGroupItem>
                <ExButtonGroupItem value="reports" disabled>
                  Reports
                </ExButtonGroupItem>
              </ExButtonGroup>
              <p className="text-sm text-muted" aria-live="polite">
                Selected: {view}
              </p>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">{`const [view, setView] = useState("overview");
<ExButtonGroup value={view} onValueChange={setView} aria-label="Dashboard view">
  <ExButtonGroupItem value="overview">Overview</ExButtonGroupItem>
  <ExButtonGroupItem value="members">Members</ExButtonGroupItem>
</ExButtonGroup>
// Uncontrolled: defaultValue="overview"
// Independent action: <ExButtonGroupItem active={isActive} onClick={...}>...</ExButtonGroupItem>`}</ExCodeBlock>
        </section>
        <section id="responsive" className="grid gap-4 section-anchor">
          <h3 className="text-2xl font-semibold">Responsive</h3>
          <p>
            Wrap adapts to the container width. Scroll keeps a single horizontal row. Stack uses a vertical layout on mobile and a row from
            the sm breakpoint. Labels remain visible and may wrap.
          </p>
          <ExCanvas>
            <div className="grid w-full min-w-0 gap-5">
              {(["wrap", "scroll", "stack"] as const).map((layout) => (
                <div key={layout} className="grid min-w-0 gap-2">
                  <p className="text-sm font-medium">{layout}</p>
                  <ExButtonGroup aria-label={layout + " example"} responsive={layout} defaultValue="activity" fit={false}>
                    <ExButtonGroupItem value="activity">Recent activity</ExButtonGroupItem>
                    <ExButtonGroupItem value="billing">Billing and subscriptions</ExButtonGroupItem>
                    <ExButtonGroupItem value="preferences">Account preferences</ExButtonGroupItem>
                  </ExButtonGroup>
                </div>
              ))}
            </div>
          </ExCanvas>
        </section>

        <section id="variant" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">
              Choose from different visual variants to match the emphasis of grouped actions. Use <code>solid</code> for primary actions,{" "}
              <code>soft</code> for a subtle appearance, or <code>outline</code> to maintain a lightweight, bordered style.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-full max-w-100 min-w-0 gap-3">
              <ExButtonGroup variant="solid" color="secondary">
                <ExButtonGroupItem active>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup variant="soft" color="secondary">
                <ExButtonGroupItem active>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup variant="outline" color="secondary">
                <ExButtonGroupItem active>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButtonGroup variant="solid">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup variant="soft">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup variant="outline">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>`}
          </ExCodeBlock>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Apply semantic color styles to communicate the purpose of grouped actions. Available colors include primary, secondary,
              success, warning, and danger while preserving a consistent appearance across all buttons.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-full max-w-100 min-w-0 gap-3">
              <ExButtonGroup color="primary">
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup color="secondary">
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup color="warning">
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup color="success">
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup color="danger">
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButtonGroup color="primary">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup color="secondary">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup color="warning">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup color="success">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup color="danger">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Choose between the default and full radius styles to control the overall shape of the button group while preserving a
              consistent appearance across all grouped buttons.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-full max-w-100 min-w-0 gap-3">
              <ExButtonGroup radius="default">
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup radius="full">
                <ExButtonGroupItem>Button One</ExButtonGroupItem>
                <ExButtonGroupItem>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButtonGroup radius="default">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup radius="full">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Choose between the default and full radius styles to control the overall shape of the button group while preserving a
              consistent appearance across all grouped buttons.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-full max-w-100 min-w-0 gap-3">
              <ExButtonGroup size="xs">
                <ExButtonGroupItem active>Button One</ExButtonGroupItem>
                <ExButtonGroupItem loading>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem disabled>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup size="sm">
                <ExButtonGroupItem active>Button One</ExButtonGroupItem>
                <ExButtonGroupItem loading>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem disabled>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup size="md">
                <ExButtonGroupItem active>Button One</ExButtonGroupItem>
                <ExButtonGroupItem loading>Button Two</ExButtonGroupItem>
                <ExButtonGroupItem disabled>Button Three</ExButtonGroupItem>
              </ExButtonGroup>
              <div className="flex">
                <ExButtonGroup size="lg">
                  <ExButtonGroupItem active>Button One</ExButtonGroupItem>
                  <ExButtonGroupItem loading>Button Two</ExButtonGroupItem>
                  <ExButtonGroupItem disabled>Button Three</ExButtonGroupItem>
                </ExButtonGroup>
                <ExButton size="lg">Button</ExButton>
              </div>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButtonGroup size="xs">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup size="sm">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup size="md">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>
<ExButtonGroup size="lg">
  <ExButtonGroupItem>Button One</ExButtonGroupItem>
  <ExButtonGroupItem>Button Two</ExButtonGroupItem>
  <ExButtonGroupItem>Button Three</ExButtonGroupItem>
</ExButtonGroup>`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Button group items can display leading icons alongside text or render as icon-only buttons for compact action groups. Icons
              help improve recognition while maintaining a consistent grouped appearance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-full max-w-100 min-w-0 gap-3">
              <ExButtonGroup>
                <ExButtonGroupItem leftIcon={<Home size={16} />}>Home</ExButtonGroupItem>
                <ExButtonGroupItem leftIcon={<User size={16} />}>Profile</ExButtonGroupItem>
                <ExButtonGroupItem leftIcon={<Settings size={16} />}>Setting</ExButtonGroupItem>
              </ExButtonGroup>
              <ExButtonGroup>
                <ExButtonGroupItem iconOnly aria-label="Home">
                  <Home size={16} />
                </ExButtonGroupItem>
                <ExButtonGroupItem iconOnly aria-label="Profile">
                  <User size={16} />
                </ExButtonGroupItem>
                <ExButtonGroupItem iconOnly aria-label="Settings">
                  <Settings size={16} />
                </ExButtonGroupItem>
              </ExButtonGroup>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButtonGroup>
  <ExButtonGroupItem leftIcon={<Home size={16} />}>
    Home
  </ExButtonGroupItem>
  <ExButtonGroupItem leftIcon={<User size={16} />}>
    Profile
  </ExButtonGroupItem>
  <ExButtonGroupItem leftIcon={<Settings size={16} />}>
    Setting
  </ExButtonGroupItem>
</ExButtonGroup>

<ExButtonGroup>
  <ExButtonGroupItem iconOnly>
    <Home size={16} />
  </ExButtonGroupItem>
  <ExButtonGroupItem iconOnly>
    <User size={16} />
  </ExButtonGroupItem>
  <ExButtonGroupItem iconOnly>
    <Settings size={16} />
  </ExButtonGroupItem>
</ExButtonGroup>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
