import { useState } from "react";
import ExCheckbox from "../lib/components/Checkbox/ExCheckbox";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function CheckboxPage() {
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
    {
      name: "Radius",
      link: "#radius",
    },
  ];

  const [checked, setChecked] = useState(false);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Checkbox</h2>
          <p>
            ExCheckbox is a form control that allows users to select one or
            multiple options. It supports controlled state, indeterminate state,
            descriptions, validation messages, and multiple sizes.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Use <code>ExCheckbox</code> with <code>checked</code> and{" "}
              <code>onChecked</code> for controlled state management.
            </p>
          </div>

          <ExCanvas>
            <div className="max-w-100">
              <ExCheckbox
                checked={checked}
                onChecked={setChecked}
                label="Active"
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [checked, setChecked] = useState(false);

<ExCheckbox
  checked={checked}
  onChecked={setChecked}
  label="Active"
/>`}
          </ExCodeBlock>
        </section>

        <section id="state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">State</h3>
            <p className="text-muted text-md">
              Checkbox supports description, error message, disabled, and
              indeterminate states.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4">
              <ExCheckbox label="Default" />
              <ExCheckbox
                label="With description"
                description="Receive email notifications and updates."
              />
              <ExCheckbox label="With error" error="This field is required." />
              <ExCheckbox label="Disabled" disabled />
              <ExCheckbox label="Indeterminate" indeterminate />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExCheckbox label="Default" />

<ExCheckbox
  label="With description"
  description="Receive email notifications."
/>

<ExCheckbox
  label="With error"
  error="This field is required."
/>

<ExCheckbox
  label="Disabled"
  disabled
/>

<ExCheckbox
  label="Indeterminate"
  indeterminate
/>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Adjust checkbox size using the <code>size</code> property.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4">
              <ExCheckbox size="xs" label="Extra Small" />
              <ExCheckbox size="sm" label="Small" />
              <ExCheckbox size="md" label="Medium" />
              <ExCheckbox size="lg" label="Large" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExCheckbox size="xs" label="Extra Small" />
<ExCheckbox size="sm" label="Small" />
<ExCheckbox size="md" label="Medium" />
<ExCheckbox size="lg" label="Large" />`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Adjust checkbox corner style using the <code>radius</code>{" "}
              property.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-100">
              <ExCheckbox checked radius="default" label="Default radius" />

              <ExCheckbox checked radius="full" label="Full radius" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExCheckbox
  checked
  radius="default"
  label="Default radius"
/>

<ExCheckbox
  checked
  radius="full"
  label="Full radius"
/>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
