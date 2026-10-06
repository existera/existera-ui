import ExCard from "../lib/components/Card/ExCard";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function CardPage() {
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
      name: "Advanced Usage",
      link: "#advanced-usage",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Card</h2>
          <p>
            Cards are flexible containers used to group related content and
            actions into a single surface. They help organize information in a
            clear, structured, and visually separated layout.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Wrap your content inside <code>ExCard</code> to display it within
              a visually separated container. Cards can contain headings, text,
              media, buttons, or any custom React elements.
            </p>
          </div>

          <ExCanvas>
            <div className="max-w-100">
              <ExCard>
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold">Title Card</h1>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Corporis expedita, repellat debitis deserunt esse aspernatur
                    consectetur quasi, quo cumque aut explicabo nostrum,
                    quisquam officiis amet maiores a quas dolor repellendus.
                  </p>
                </div>
              </ExCard>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExCard>
  <h3>Title Card</h3>
  <p>Your content goes here.</p>
</ExCard>`}
          </ExCodeBlock>
        </section>

        <section id="advanced-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Advanced Usage</h3>
            <p className="text-muted text-md">
              Cards naturally compose with other components to build more
              sophisticated interfaces. Use them to separate related
              information, highlight important metrics, or create reusable
              sections within dashboards and application layouts.
            </p>
          </div>

          <ExCanvas>
            <div className="grid gap-4 md:grid-cols-2 mx-20">
              <ExCard>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted">Monthly Revenue</p>
                    <h2 className="text-3xl font-bold">$48,520</h2>
                  </div>

                  <span className="rounded-full bg-success/15 px-3 py-1 text-sm text-success">
                    +18.2%
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Progress</span>
                    <span>81%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-secondary/20">
                    <div className="h-full w-[81%] rounded-full bg-primary" />
                  </div>

                  <p className="text-sm text-muted">
                    Revenue continues to grow steadily compared with the
                    previous month.
                  </p>
                </div>
              </ExCard>

              <ExCard>
                <div className="space-y-5">
                  <div>
                    <h3 className="font-semibold">Recent Activity</h3>
                    <p className="text-sm text-muted">
                      Keep important updates grouped in a dedicated section.
                    </p>
                  </div>

                  {[
                    ["Olivia Martin", "Created a new invoice", "2m ago"],
                    ["James Wilson", "Updated inventory", "12m ago"],
                    ["Sophia Lee", "Invited a new member", "1h ago"],
                  ].map(([name, action, time]) => (
                    <div
                      key={name}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-sm text-muted">{action}</p>
                      </div>

                      <span className="text-xs text-muted whitespace-nowrap">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </ExCard>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<div className="grid gap-4 md:grid-cols-2">
  <ExCard>
    <RevenueSummary />
  </ExCard>

  <ExCard>
    <RecentActivity />
  </ExCard>
</div>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
