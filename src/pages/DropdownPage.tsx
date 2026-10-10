import { ExInput } from "@/lib";
import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExDropdown from "../lib/components/Dropdown/ExDropdown";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import { Search } from "lucide-react";

export default function DropdownPage() {
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
      name: "Alignment",
      link: "#alignment",
    },
    {
      name: "Disabled",
      link: "#disabled-trigger",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Dropdown</h2>
          <p>
            Dropdowns display a floating menu of actions or options that appears when users interact with a trigger element. They help keep
            interfaces clean by hiding secondary actions until they are needed.
          </p>
        </section>

        <section id="basic-usage" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Basic Usage</h3>

            <p className="text-md text-muted">
              The most basic implementation of the Dropdown component. Wrap any element inside{" "}
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">ExDropdown.Trigger</code> and place the menu
              inside <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">ExDropdown.Content</code>.
            </p>
          </div>

          <div className="grid gap-3">
            <ExCanvas>
              <ExDropdown>
                <ExDropdown.Trigger>
                  <ExButton>Open Dropdown</ExButton>
                </ExDropdown.Trigger>
                <ExDropdown.Content>
                  <div className="p-1 grid gap-2">
                    <ExInput size="sm" placeholder="Search" leftIcon={<Search size={14} />} />
                    <div className="flex flex-col">
                      <ExDropdown.Item onClick={() => console.log("New File")}>New File</ExDropdown.Item>
                      <ExDropdown.Item onClick={() => console.log("Open File")}>Open File</ExDropdown.Item>
                      <ExDropdown.Item onClick={() => console.log("Save")}>Save</ExDropdown.Item>
                    </div>
                  </div>
                </ExDropdown.Content>
              </ExDropdown>
            </ExCanvas>

            <ExCodeBlock language="tsx">
              {`<ExDropdown>
  <ExDropdown.Trigger>
    <ExButton>Open Dropdown</ExButton>
  </ExDropdown.Trigger>

  <ExDropdown.Content>
    <div className="flex min-w-40 flex-col">
      <button className="rounded-md px-3 py-2 text-left hover:bg-surface-2">
        New File
      </button>

      <button className="rounded-md px-3 py-2 text-left hover:bg-surface-2">
        Open File
      </button>

      <button className="rounded-md px-3 py-2 text-left hover:bg-surface-2">
        Save
      </button>
    </div>
  </ExDropdown.Content>
</ExDropdown>`}
            </ExCodeBlock>
          </div>
        </section>

        <section id="alignment" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Alignment</h3>

            <p className="text-md text-muted">
              Control the dropdown position relative to the trigger using the{" "}
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">defaultAlign</code> prop.
            </p>
          </div>

          <div className="grid gap-3">
            <ExCanvas>
              <div className="flex gap-5">
                <ExDropdown defaultAlign="left">
                  <ExDropdown.Trigger>
                    <ExButton variant="outline">Left</ExButton>
                  </ExDropdown.Trigger>

                  <ExDropdown.Content>
                    <div className="flex min-w-40 flex-col">
                      <button className="rounded-md px-3 py-2 text-left hover:bg-surface-2">Align Left</button>
                    </div>
                  </ExDropdown.Content>
                </ExDropdown>

                <ExDropdown defaultAlign="center">
                  <ExDropdown.Trigger>
                    <ExButton variant="outline">Center</ExButton>
                  </ExDropdown.Trigger>

                  <ExDropdown.Content>
                    <div className="flex min-w-40 flex-col">
                      <button className="rounded-md px-3 py-2 text-left hover:bg-surface-2">Align Center</button>
                    </div>
                  </ExDropdown.Content>
                </ExDropdown>

                <ExDropdown defaultAlign="right">
                  <ExDropdown.Trigger>
                    <ExButton variant="outline">Right</ExButton>
                  </ExDropdown.Trigger>

                  <ExDropdown.Content>
                    <div className="flex min-w-40 flex-col">
                      <button className="rounded-md px-3 py-2 text-left hover:bg-surface-2">Align Right</button>
                    </div>
                  </ExDropdown.Content>
                </ExDropdown>
              </div>
            </ExCanvas>

            <ExCodeBlock language="tsx">
              {`<ExDropdown defaultAlign="left">
  ...
</ExDropdown>

<ExDropdown defaultAlign="center">
  ...
</ExDropdown>

<ExDropdown defaultAlign="right">
  ...
</ExDropdown>`}
            </ExCodeBlock>
          </div>
        </section>

        <section id="disabled-trigger" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Disabled</h3>

            <p className="text-md text-muted">Prevent the dropdown from opening by disabling the trigger.</p>
          </div>

          <div className="grid gap-3">
            <ExCanvas>
              <ExDropdown disabled>
                <ExDropdown.Trigger>
                  <ExButton disabled>Disabled Dropdown</ExButton>
                </ExDropdown.Trigger>

                <ExDropdown.Content>
                  <div className="flex min-w-40 flex-col">
                    <button className="rounded-md px-3 py-2 text-left hover:bg-surface-2">Not Accessible</button>
                  </div>
                </ExDropdown.Content>
              </ExDropdown>
            </ExCanvas>

            <ExCodeBlock language="tsx">
              {`<ExDropdown handleSetOpen>
  <ExDropdown.Trigger>
    <ExButton disabled>
      Disabled Dropdown
    </ExButton>
  </ExDropdown.Trigger>

  <ExDropdown.Content>
    ...
  </ExDropdown.Content>
</ExDropdown>`}
            </ExCodeBlock>
          </div>
        </section>
      </div>
    </PageContent>
  );
}
