import { Home, Settings, User } from "lucide-react";
import ExButtonGroup from "../lib/components/ButtonGroup/ExButtonGroup";
import ExButtonGroupItem from "../lib/components/ButtonGroup/ExButtonGroupItem";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function ButtonGroupPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
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
            Button Group organizes multiple related buttons into a single
            horizontal control. It provides consistent spacing, shared borders,
            and unified styling, making it ideal for grouped actions, segmented
            controls, or option selection.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Wrap multiple <code>ExButtonGroupItem</code> components inside{" "}
              <code>ExButtonGroup</code> to create a visually connected set of
              buttons. Each item behaves as an individual button while sharing a
              unified appearance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-100 gap-3">
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

        <section id="variant" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">
              Choose from different visual variants to match the emphasis of
              grouped actions. Use <code>solid</code> for primary actions,{" "}
              <code>soft</code> for a subtle appearance, or <code>outline</code>{" "}
              to maintain a lightweight, bordered style.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-100 gap-3">
              <ExButtonGroup variant="solid">
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
              Apply semantic color styles to communicate the purpose of grouped
              actions. Available colors include primary, secondary, success,
              warning, and danger while preserving a consistent appearance
              across all buttons.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-100 gap-3">
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
              Choose between the default and full radius styles to control the
              overall shape of the button group while preserving a consistent
              appearance across all grouped buttons.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-100 gap-3">
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
              Choose between the default and full radius styles to control the
              overall shape of the button group while preserving a consistent
              appearance across all grouped buttons.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-100 gap-3">
              <ExButtonGroup size="xs">
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
              </ExButtonGroup>
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

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Choose between the default and full radius styles to control the
              overall shape of the button group while preserving a consistent
              appearance across all grouped buttons.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-100 gap-3">
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

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Button group items can display leading icons alongside text or
              render as icon-only buttons for compact action groups. Icons help
              improve recognition while maintaining a consistent grouped
              appearance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col items-center w-100 gap-3">
              <ExButtonGroup>
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
