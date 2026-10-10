import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExPagination from "../lib/components/Pagination/ExPagination";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function PaginationPage() {
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
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Pagination</h2>
          <p>
            The <code>ExPagination</code> component enables users to navigate
            through large collections of data by dividing content into multiple
            pages. It provides intuitive page controls with support for previous
            and next navigation, page numbers, and collapsed ranges for improved
            usability.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Use the default pagination to navigate between pages by specifying
              the current page, total number of pages, and the visible page
              range.
            </p>
          </div>

          <ExCanvas>
            <div className="flex">
              <ExPagination page={1} total={10} range={3} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExPagination
  page={1}
  total={10}
  range={3}
/>`}</ExCodeBlock>
        </section>

        <section id="variant" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">
              Choose from multiple visual styles to match the appearance of your
              application. Each variant applies a different emphasis while
              maintaining the same pagination behavior.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExPagination variant="solid" page={1} total={10} range={3} />
              <ExPagination variant="soft" page={2} total={10} range={3} />
              <ExPagination variant="outline" page={3} total={10} range={3} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExPagination
  variant="solid"
  page={1}
  total={10}
  range={3}
/>

<ExPagination
  variant="soft"
  page={1}
  total={10}
  range={3}
/>

<ExPagination
  variant="outline"
  page={1}
  total={10}
  range={3}
/>`}</ExCodeBlock>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Apply different color schemes to the active page and navigation
              controls to match your application's visual identity. All
              available semantic colors provide the same functionality with
              different visual emphasis.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExPagination color="primary" page={1} total={10} range={3} />
              <ExPagination color="secondary" page={1} total={10} range={3} />
              <ExPagination color="warning" page={1} total={10} range={3} />
              <ExPagination color="success" page={1} total={10} range={3} />
              <ExPagination color="danger" page={1} total={10} range={3} />
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">{`<ExPagination color="primary" page={1} total={10} range={3} />
<ExPagination color="secondary" page={1} total={10} range={3} />
<ExPagination color="warning" page={1} total={10} range={3} />
<ExPagination color="success" page={1} total={10} range={3} />
<ExPagination color="danger" page={1} total={10} range={3} />`}</ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Adjust the size of the pagination controls to suit different
              layouts and interface densities. Each size scales the navigation
              buttons and page numbers while preserving consistent spacing and
              behavior.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExPagination size="xs" page={1} total={10} range={3} />
              <ExPagination size="sm" page={1} total={10} range={3} />
              <ExPagination size="md" page={1} total={10} range={3} />
              <ExPagination size="lg" page={1} total={10} range={3} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExPagination size="xs" page={1} total={10} range={3} />
<ExPagination size="sm" page={1} total={10} range={3} />
<ExPagination size="md" page={1} total={10} range={3} />
<ExPagination size="lg" page={1} total={10} range={3} />`}</ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Adjust the corner radius of the pagination buttons to better match
              your interface. Use the default radius for a balanced appearance
              or the full radius for a pill-shaped style.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExPagination page={1} total={10} range={3} radius="default" />
              <ExPagination page={1} total={10} range={3} radius="full" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExPagination
  page={1}
  total={10}
  range={3}
  radius="default"
/>

<ExPagination
  page={1}
  total={10}
  range={3}
  radius="full"
/>`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
