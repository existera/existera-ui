import ExCanvas from "../shared/components/ExCanvas";
import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import { RefreshCcw, Sparkles } from "lucide-react";
import PageContent from "../shared/documentation/PageContent";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";

export default function ButtonPage() {
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
      name: "Link Button",
      link: "#link-button",
    },
    {
      name: "Variant",
      link: "#variant",
    },
    {
      name: "Color",
      link: "#color",
    },
    {
      name: "Radius",
      link: "#radius",
    },
    {
      name: "Size",
      link: "#size",
    },
    {
      name: "Icon",
      link: "#icon",
    },
  ];
  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Button</h2>
          <p>
            Buttons are the primary interactive elements used to trigger
            actions, submit forms, navigate interfaces, and execute workflows. A
            consistent button system improves usability, accessibility, and
            visual hierarchy throughout an application.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Create interactive actions with a default button style suitable
              for most use cases.
            </p>
          </div>
          <ExCanvas>
            <ExButton>Button</ExButton>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExButton>Button</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="link-button" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Link Button</h3>
            <p className="text-muted text-md">
              Add href to render a native link with the same button styles.
              Use target="_blank" to open a new tab. Disabled and loading links
              cannot navigate and are removed from the keyboard tab order.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              <ExButton href="#basic-usage">Basic Usage</ExButton>
              <ExButton href="#variant" variant="outline" target="_blank">
                Open in new tab
              </ExButton>
              <ExButton href="#variant" disabled>Disabled link</ExButton>
              <ExButton href="#variant" loading>Loading link</ExButton>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExButton href="/dashboard">Dashboard</ExButton>

<ExButton href="/documentation" target="_blank" variant="outline">
  Open documentation
</ExButton>

<ExButton href="/dashboard" disabled>Disabled link</ExButton>
<ExButton href="/dashboard" loading>Loading link</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="variant" className="grid gap-5 section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">
              Choose from multiple visual styles to communicate emphasis,
              hierarchy, and interaction intent.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Solid</h4>
              <ExCanvas>
                <ExButton variant="solid">Button</ExButton>
              </ExCanvas>
              <ExCodeBlock language="html">
                {`<ExButton variant="solid">
  Button
</ExButton>`}
              </ExCodeBlock>
            </div>
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Soft</h4>
              <ExCanvas>
                <ExButton variant="soft">Button</ExButton>
              </ExCanvas>
              <ExCodeBlock language="html">
                {`<ExButton variant="soft">
  Button
</ExButton>`}
              </ExCodeBlock>
            </div>
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Outline</h4>
              <ExCanvas>
                <ExButton variant="outline">Button</ExButton>
              </ExCanvas>
              <ExCodeBlock language="html">
                {`<ExButton variant="outline">
  Button
</ExButton>`}
              </ExCodeBlock>
            </div>
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Text</h4>
              <ExCanvas>
                <ExButton variant="text">Button</ExButton>
              </ExCanvas>
              <ExCodeBlock language="html">
                {`<ExButton variant="text">
  Button
</ExButton>`}
              </ExCodeBlock>
            </div>
          </div>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Apply semantic color variants to represent primary actions,
              statuses, and contextual meanings throughout the interface.
            </p>
          </div>
          <ExCanvas>
            <div className="grid gap-2">
              <div className="flex flex-wrap gap-2">
                <ExButton color="primary">Button</ExButton>
                <ExButton color="secondary">Button</ExButton>
                <ExButton color="warning">Button</ExButton>
                <ExButton color="success">Button</ExButton>
                <ExButton color="danger">Button</ExButton>
              </div>
              <div className="flex flex-wrap gap-2">
                <ExButton variant="soft" color="primary">
                  Button
                </ExButton>
                <ExButton variant="soft" color="secondary">
                  Button
                </ExButton>
                <ExButton variant="soft" color="warning">
                  Button
                </ExButton>
                <ExButton variant="soft" color="success">
                  Button
                </ExButton>
                <ExButton variant="soft" color="danger">
                  Button
                </ExButton>
              </div>
              <div className="flex flex-wrap gap-2">
                <ExButton variant="outline" color="primary">
                  Button
                </ExButton>
                <ExButton variant="outline" color="secondary">
                  Button
                </ExButton>
                <ExButton variant="outline" color="warning">
                  Button
                </ExButton>
                <ExButton variant="outline" color="success">
                  Button
                </ExButton>
                <ExButton variant="outline" color="danger">
                  Button
                </ExButton>
              </div>
              <div className="flex flex-wrap gap-2">
                <ExButton variant="text" color="primary">
                  Button
                </ExButton>
                <ExButton variant="text" color="secondary">
                  Button
                </ExButton>
                <ExButton variant="text" color="warning">
                  Button
                </ExButton>
                <ExButton variant="text" color="success">
                  Button
                </ExButton>
                <ExButton variant="text" color="danger">
                  Button
                </ExButton>
              </div>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExButton color="primary">Button</ExButton>
<ExButton color="secondary">Button</ExButton>
<ExButton color="warning">Button</ExButton>
<ExButton color="success">Button</ExButton>
<ExButton color="danger">Button</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Select from predefined sizes to fit dense toolbars, forms,
              dialogs, and page-level actions.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col md:flex-row gap-5">
              <ExButton radius="default">Button</ExButton>
              <ExButton radius="full">Button</ExButton>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExButton radius="default">Button</ExButton>
<ExButton radius="full">Button</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Select from predefined sizes to fit dense toolbars, forms,
              dialogs, and page-level actions.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-5">
                <ExButton size="xs">Button</ExButton>
                <ExButton size="sm">Button</ExButton>
                <ExButton size="md">Button</ExButton>
                <ExButton size="lg">Button</ExButton>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <ExButton size="xs" radius="full">
                  Button
                </ExButton>
                <ExButton size="sm" radius="full">
                  Button
                </ExButton>
                <ExButton size="md" radius="full">
                  Button
                </ExButton>
                <ExButton size="lg" radius="full">
                  Button
                </ExButton>
              </div>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExButton size="xs">Button</ExButton>
<ExButton size="sm">Button</ExButton>
<ExButton size="md">Button</ExButton>
<ExButton size="lg">Button</ExButton>

<ExButton size="xs" radius="full">Button</ExButton>
<ExButton size="sm" radius="full">Button</ExButton>
<ExButton size="md" radius="full">Button</ExButton>
<ExButton size="lg" radius="full">Button</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Enhance button clarity by placing icons before, after, or without
              accompanying text.
            </p>
          </div>
          <ExCanvas>
            <div className="flex gap-5">
              <ExButton leftIcon={<Sparkles size={13} />}>Button</ExButton>
              <ExButton iconOnly>
                <RefreshCcw size={13} />
              </ExButton>
              <ExButton rightIcon={<Sparkles size={13} />}>Button</ExButton>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExButton leftIcon={<Sparkles size={13}/>}>
  Button
</ExButton>

<ExButton iconOnly>
  <RefreshCcw size={13}/>
</ExButton>

<ExButton rightIcon={<Sparkles size={13}/>}>
  Button
</ExButton>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
