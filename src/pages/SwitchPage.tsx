import { useState } from "react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExSwitch from "../lib/components/Switch/ExSwitch";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function SwitchPage() {
  const [checked, setChecked] = useState(true);

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
      name: "Controlled",
      link: "#controlled",
    },
    {
      name: "Default Checked",
      link: "#default-checked",
    },
    {
      name: "Size",
      link: "#size",
    },
    {
      name: "Disabled",
      link: "#disabled",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Switch</h2>
          <p>
            The <code>ExSwitch</code> component allows users to toggle between
            two states, such as enabled or disabled. It supports controlled and
            uncontrolled usage, multiple sizes, and disabled states for building
            accessible interfaces.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Render a switch using the default appearance.
            </p>
          </div>

          <ExCanvas>
            <ExSwitch />
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExSwitch />`}</ExCodeBlock>
        </section>

        <section id="controlled" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Controlled</h3>
            <p className="text-muted text-md">
              Control the checked state externally using React state.
            </p>
          </div>

          <ExCanvas>
            <ExSwitch checked={checked} onCheckedChange={setChecked} />
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [checked, setChecked] = useState(true);

<ExSwitch
  checked={checked}
  onCheckedChange={setChecked}
/>`}
          </ExCodeBlock>
        </section>

        <section id="default-checked" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Default Checked</h3>
            <p className="text-muted text-md">
              Initialize the switch in the checked state without controlling it.
            </p>
          </div>

          <ExCanvas>
            <ExSwitch defaultChecked />
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSwitch defaultChecked />`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Choose from multiple sizes to match different layouts.
            </p>
          </div>

          <ExCanvas>
            <div className="flex items-center gap-6">
              <ExSwitch size="xs" defaultChecked />
              <ExSwitch size="sm" defaultChecked />
              <ExSwitch size="md" defaultChecked />
              <ExSwitch size="lg" defaultChecked />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExSwitch size="xs" />
  <ExSwitch size="sm" />
  <ExSwitch size="md" />
  <ExSwitch size="lg" />
</>`}
          </ExCodeBlock>
        </section>

        <section id="disabled" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Disabled</h3>
            <p className="text-muted text-md">
              Prevent user interaction by disabling the switch.
            </p>
          </div>

          <ExCanvas>
            <div className="flex items-center gap-6">
              <ExSwitch disabled />
              <ExSwitch defaultChecked disabled />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<>
  <ExSwitch disabled />
  <ExSwitch defaultChecked disabled />
</>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
