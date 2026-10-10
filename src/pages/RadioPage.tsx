import { useState } from "react";
import ExRadio from "../lib/components/Radio/ExRadio";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function RadioPage() {
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
      name: "State",
      link: "#state",
    },
    {
      name: "Size",
      link: "#size",
    },
  ];

  const [selected, setSelected] = useState("active");

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Radio</h2>
          <p>
            ExRadio is a form control that allows users to select a single
            option from a group of choices. It supports controlled state,
            descriptions, validation messages, disabled states, and multiple
            sizes.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Use <code>ExRadio</code> with <code>checked</code> and{" "}
              <code>onChecked</code> for controlled state management.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4">
              <ExRadio
                checked={selected === "active"}
                onChecked={() => setSelected("active")}
                label="Active"
              />

              <ExRadio
                checked={selected === "inactive"}
                onChecked={() => setSelected("inactive")}
                label="Inactive"
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [selected, setSelected] = useState("active");

<ExRadio
  checked={selected === "active"}
  onChecked={() => setSelected("active")}
  label="Active"
/>

<ExRadio
  checked={selected === "inactive"}
  onChecked={() => setSelected("inactive")}
  label="Inactive"
/>`}
          </ExCodeBlock>
        </section>

        <section id="state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">State</h3>
            <p className="text-muted text-md">
              Radio supports description, error message, and disabled states.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4">
              <ExRadio label="Default" />

              <ExRadio
                label="With description"
                description="Choose this option to receive notifications."
              />

              <ExRadio label="With error" error="This field is required." />

              <ExRadio label="Disabled" disabled />

              <ExRadio label="Checked" checked />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExRadio label="Default" />

<ExRadio
  label="With description"
  description="Choose this option."
/>

<ExRadio
  label="With error"
  error="This field is required."
/>

<ExRadio
  label="Disabled"
  disabled
/>

<ExRadio
  label="Checked"
  checked
/>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Adjust radio size using the <code>size</code> property.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4">
              <ExRadio size="xs" label="Extra Small" />

              <ExRadio size="sm" label="Small" />

              <ExRadio size="md" label="Medium" />

              <ExRadio size="lg" label="Large" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExRadio size="xs" label="Extra Small" />

<ExRadio size="sm" label="Small" />

<ExRadio size="md" label="Medium" />

<ExRadio size="lg" label="Large" />`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
