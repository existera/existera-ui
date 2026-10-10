import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExProgress from "../lib/components/Progress/ExProgress";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function ProgressPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Color", link: "#color" },
    { name: "Radius", link: "#radius" },
    { name: "Size", link: "#size" },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2">
          <h2 className="text-3xl font-semibold">Progress</h2>
          <p>
            The <code>ExProgress</code> component visually represents the
            completion status of a task or process. Customize its color, size,
            and border radius to match your application's design.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Display a simple progress bar by providing the current progress
              value.
            </p>
          </div>

          <ExCanvas>
            <div className="flex w-full max-w-md">
              <ExProgress value={75} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExProgress value={75} />`}
          </ExCodeBlock>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Choose from the available semantic colors to indicate different
              progress states.
            </p>
          </div>

          <ExCanvas>
            <div className="flex w-full max-w-md flex-col gap-4">
              <ExProgress value={65} color="primary" />
              <ExProgress value={65} color="secondary" />
              <ExProgress value={65} color="success" />
              <ExProgress value={65} color="warning" />
              <ExProgress value={65} color="danger" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExProgress value={65} color="primary" />
  <ExProgress value={65} color="success" />
  <ExProgress value={65} color="warning" />
  <ExProgress value={65} color="danger" />
</>`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Enable or disable rounded corners to match different interface
              styles.
            </p>
          </div>

          <ExCanvas>
            <div className="flex w-full max-w-md flex-col gap-4">
              <ExProgress value={70} radius />
              <ExProgress value={70} radius={false} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExProgress value={70} rounded />
  <ExProgress value={70} rounded={false} />
</>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Adjust the height of the progress bar using the available size
              options.
            </p>
          </div>

          <ExCanvas>
            <div className="flex w-full max-w-md flex-col gap-4">
              <ExProgress value={60} size="xs" />
              <ExProgress value={60} size="sm" />
              <ExProgress value={60} size="md" />
              <ExProgress value={60} size="lg" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExProgress value={60} size="xs" />
  <ExProgress value={60} size="sm" />
  <ExProgress value={60} size="md" />
  <ExProgress value={60} size="lg" />
</>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
