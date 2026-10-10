import ExCanvas from "../shared/components/ExCanvas";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExLink from "../lib/components/Link/ExLink";
import PageContent from "../shared/documentation/PageContent";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function LinkPage() {
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
      name: "Icon",
      link: "#icon",
    },
    {
      name: "Link on paragraph",
      link: "#link-on-paragraph",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Link</h2>
          <p>
            Links enable navigation between pages, external resources, and
            application routes. They support multiple colors, sizes, underlining
            behaviors, and icon placements to fit different content and
            navigation patterns.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Create navigational elements using the default link style.
            </p>
          </div>

          <ExCanvas>
            <ExLink href="#">Documentation</ExLink>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExLink href="#">
  Documentation
</ExLink>`}
          </ExCodeBlock>
        </section>

        <section id="variant" className="grid gap-5 section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">
              Control underline behavior to match different navigation styles.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              <ExLink underline="none">No Underline</ExLink>
              <ExLink underline="hover">Underline on Hover</ExLink>
              <ExLink underline="always">Always Underline</ExLink>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExLink underline="none">
  No Underline
</ExLink>

<ExLink underline="hover">
  Underline on Hover
</ExLink>

<ExLink underline="always">
  Always Underline
</ExLink>`}
          </ExCodeBlock>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Apply semantic colors to communicate emphasis and contextual
              meaning.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              <ExLink color="default">Default</ExLink>
              <ExLink color="primary">Primary</ExLink>
              <ExLink color="secondary">Secondary</ExLink>
              <ExLink color="success">Success</ExLink>
              <ExLink color="warning">Warning</ExLink>
              <ExLink color="danger">Danger</ExLink>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExLink color="default">Default</ExLink>
<ExLink color="primary">Primary</ExLink>
<ExLink color="secondary">Secondary</ExLink>
<ExLink color="success">Success</ExLink>
<ExLink color="warning">Warning</ExLink>
<ExLink color="danger">Danger</ExLink>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Select from predefined sizes to fit dense interfaces and content
              layouts.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExLink size="xs">Extra Small Link</ExLink>
              <ExLink size="sm">Small Link</ExLink>
              <ExLink size="md">Medium Link</ExLink>
              <ExLink size="lg">Large Link</ExLink>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExLink size="xs">Extra Small Link</ExLink>
<ExLink size="sm">Small Link</ExLink>
<ExLink size="md">Medium Link</ExLink>
<ExLink size="lg">Large Link</ExLink>`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Enhance navigation clarity by placing icons before or after link
              content.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExLink leftIcon={<ExternalLink size={14} />}>
                External Resource
              </ExLink>

              <ExLink rightIcon={<ArrowRight size={14} />}>
                Continue Reading
              </ExLink>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExLink leftIcon={<ExternalLink size={14} />}>
  External Resource
</ExLink>

<ExLink rightIcon={<ArrowRight size={14} />}>
  Continue Reading
</ExLink>`}
          </ExCodeBlock>
        </section>

        <section id="link-on-paragraph" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Link on paragraph</h3>
            <p className="text-muted text-md">
              Use links inline within content to reference pages, documents, and
              external resources naturally.
            </p>
          </div>

          <ExCanvas>
            <p className="max-w-xl leading-relaxed">
              Learn more about our{" "}
              <ExLink color="primary">design system guidelines</ExLink> and
              review the{" "}
              <ExLink color="primary">component documentation</ExLink> before
              building new interfaces.
            </p>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<p>
    Learn more about our{" "}
    <ExLink color="primary">
        design system guidelines
    </ExLink>
    {" "}and review the{" "}
    <ExLink color="primary">
        component documentation
    </ExLink>.
</p>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
