import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExSkeleton from "../lib/components/Skeleton/ExSkeleton";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function SkeletonPage() {
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
      name: "Shapes",
      link: "#shapes",
    },
    {
      name: "Animation",
      link: "#animation",
    },
    {
      name: "Radius",
      link: "#radius",
    },
    {
      name: "Card Example",
      link: "#card-example",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Skeleton</h2>
          <p>
            The <code>ExSkeleton</code> component provides placeholder elements
            that mimic the layout of content while data is loading. It helps
            reduce layout shifts and improves the perceived loading experience.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Render a simple skeleton placeholder using custom dimensions.
            </p>
          </div>

          <ExCanvas>
            <div className="bg-surface p-3 rounded-lg">
              <ExSkeleton className="h-7 w-48" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSkeleton className="h-7 w-48" />`}
          </ExCodeBlock>
        </section>

        <section id="shapes" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Shapes</h3>
            <p className="text-muted text-md">
              Create different skeleton layouts using utility classes.
            </p>
          </div>

          <ExCanvas>
            <div className="flex items-center gap-6 bg-surface p-3 rounded-lg">
              <ExSkeleton className="size-12 rounded-full" />
              <ExSkeleton className="h-10 w-32 rounded-lg" />
              <ExSkeleton className="h-7 w-48" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExSkeleton className="size-12 rounded-full" />
  <ExSkeleton className="h-10 w-32 rounded-lg" />
  <ExSkeleton className="h-7 w-48" />
</>`}
          </ExCodeBlock>
        </section>

        <section id="animation" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Animation</h3>
            <p className="text-muted text-md">
              Enable or disable the loading animation.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4 w-full max-w-sm bg-surface p-3 rounded-lg">
              <ExSkeleton className="h-7 w-full" />
              <ExSkeleton className="h-7 w-full" animate={false} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExSkeleton className="h-7 w-full" />
  <ExSkeleton className="h-7 w-full" animate={false} />
</>`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Control whether the skeleton uses rounded corners.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4 w-full max-w-sm bg-surface p-3 rounded-lg">
              <ExSkeleton className="h-7 w-full" />
              <ExSkeleton className="h-7 w-full" radius="full" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExSkeleton className="h-7 w-full" />
  <ExSkeleton className="h-7 w-full" radius="full" />
</>`}
          </ExCodeBlock>
        </section>

        <section id="card-example" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Card Example</h3>
            <p className="text-muted text-md">
              Combine multiple skeleton elements to replicate a card layout
              while waiting for content to load.
            </p>
          </div>

          <ExCanvas>
            <div className="flex w-full max-w-md gap-4 rounded-xl border border-secondary/20 p-4 bg-surface">
              <ExSkeleton className="size-14 rounded-lg" />

              <div className="flex flex-1 flex-col gap-3">
                <ExSkeleton className="h-7 w-1/2" />
                <ExSkeleton className="h-4 w-full" />
                <ExSkeleton className="h-4 w-3/4" />
              </div>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<div className="flex gap-4">
  <ExSkeleton className="size-14 rounded-lg" />

  <div className="flex flex-1 flex-col gap-3">
    <ExSkeleton className="h-7 w-1/2" />
    <ExSkeleton className="h-4 w-full" />
    <ExSkeleton className="h-4 w-3/4" />
  </div>
</div>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
