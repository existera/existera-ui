import { ArrowRight, Check } from "lucide-react";
import ExBadge from "../lib/components/Badge/ExBadge";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function BadgePage() {
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
      name: "Variant",
      link: "#variant",
    },
    {
      name: "Color",
      link: "#color",
    },
    {
      name: "Size",
      link: "#size",
    },
    {
      name: "Radius",
      link: "#radius",
    },
    {
      name: "Icon",
      link: "#icon",
    },
    {
      name: "Dismissible",
      link: "#dismissible",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Badge</h2>
          <p>
            Badges are compact status indicators used to label, categorize, and
            highlight information. They help communicate state, priority, and
            metadata while maintaining a lightweight visual footprint.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Display concise labels and metadata using the default badge style.
            </p>
          </div>

          <ExCanvas>
            <ExBadge>Badge</ExBadge>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExBadge>
  Badge
</ExBadge>`}
          </ExCodeBlock>
        </section>

        <section id="variant" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">
              Choose from different visual styles to match hierarchy and
              emphasis.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              <ExBadge variant="solid">Solid</ExBadge>
              <ExBadge variant="soft">Soft</ExBadge>
              <ExBadge variant="outline">Outline</ExBadge>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExBadge variant="solid">
  Solid
</ExBadge>

<ExBadge variant="soft">
  Soft
</ExBadge>

<ExBadge variant="outline">
  Outline
</ExBadge>`}
          </ExCodeBlock>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Use semantic colors to represent status, categories, and
              contextual meanings.
            </p>
          </div>

          <ExCanvas>
            <div className="grid gap-2">
              <div className="flex flex-wrap gap-2">
                <ExBadge color="primary">Primary</ExBadge>
                <ExBadge color="secondary">Secondary</ExBadge>
                <ExBadge color="success">Success</ExBadge>
                <ExBadge color="warning">Warning</ExBadge>
                <ExBadge color="danger">Danger</ExBadge>
              </div>

              <div className="flex flex-wrap gap-2">
                <ExBadge variant="soft" color="primary">
                  Primary
                </ExBadge>
                <ExBadge variant="soft" color="secondary">
                  Secondary
                </ExBadge>
                <ExBadge variant="soft" color="success">
                  Success
                </ExBadge>
                <ExBadge variant="soft" color="warning">
                  Warning
                </ExBadge>
                <ExBadge variant="soft" color="danger">
                  Danger
                </ExBadge>
              </div>

              <div className="flex flex-wrap gap-2">
                <ExBadge variant="outline" color="primary">
                  Primary
                </ExBadge>
                <ExBadge variant="outline" color="secondary">
                  Secondary
                </ExBadge>
                <ExBadge variant="outline" color="success">
                  Success
                </ExBadge>
                <ExBadge variant="outline" color="warning">
                  Warning
                </ExBadge>
                <ExBadge variant="outline" color="danger">
                  Danger
                </ExBadge>
              </div>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExBadge color="primary">Primary</ExBadge>
<ExBadge color="secondary">Secondary</ExBadge>
<ExBadge color="success">Success</ExBadge>
<ExBadge color="warning">Warning</ExBadge>
<ExBadge color="danger">Danger</ExBadge>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Select an appropriate size based on density and content
              requirements.
            </p>
          </div>

          <ExCanvas>
            <div className="flex items-center gap-3">
              <ExBadge size="sm">Small</ExBadge>
              <ExBadge size="md">Medium</ExBadge>
              <ExBadge size="lg">Large</ExBadge>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExBadge size="sm">
  Small
</ExBadge>

<ExBadge size="md">
  Medium
</ExBadge>

<ExBadge size="lg">
  Large
</ExBadge>`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Adjust corner rounding to match your interface style.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              <ExBadge radius="default">Default</ExBadge>
              <ExBadge radius="full">Full</ExBadge>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExBadge radius="default">
  Default
</ExBadge>

<ExBadge radius="full">
  Full
</ExBadge>`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Combine badges with icons to improve recognition and scanning.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              <ExBadge leftIcon={<Check size={12} />}>Active</ExBadge>

              <ExBadge rightIcon={<ArrowRight size={12} />}>Review</ExBadge>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExBadge leftIcon={<Check size={12} />}>
  Active
</ExBadge>

<ExBadge rightIcon={<ArrowRight size={12} />}>
  Review
</ExBadge>`}
          </ExCodeBlock>
        </section>

        <section id="dismissible" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Dismissible</h3>
            <p className="text-muted text-md">
              Allow users to remove badges using a built-in dismiss action.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              <ExBadge dismissible>Filter</ExBadge>

              <ExBadge dismissible dismissPosition="start">
                Filter
              </ExBadge>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExBadge dismissible>
  Filter
</ExBadge>

<ExBadge
  dismissible
  dismissPosition="start"
>
  Filter
</ExBadge>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
