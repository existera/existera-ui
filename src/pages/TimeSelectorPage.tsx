import { ArrowRight, Clock } from "lucide-react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExTimeSelector from "../lib/components/TimeSelector/ExTimeSelector";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function TimeSelectorPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Radius", link: "#radius" },
    { name: "Size", link: "#size" },
    { name: "Icon", link: "#icon" },
    { name: "State", link: "#state" },
    { name: "Clearable", link: "#clearable" },
    { name: "Prefix & Suffix", link: "#prefix-suffix" },
    { name: "Format", link: "#format" },
  ];
  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Time Selector</h2>
          <p>
            TimeSelector allows users to select a time. It supports multiple formats (12-hour/24-hour), variants, colors, sizes, and icons.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">Choose a time using the default time selector format and style.</p>
          </div>

          <ExCanvas>
            <div className="max-w-56">
              <ExTimeSelector />
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">{`<ExTimeSelector />`}</ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Adjust the corner radius to better match your application's visual style. Use the default radius for standard interfaces or
              the full radius for a softer, pill-shaped appearance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-56">
              <ExTimeSelector radius="default" />
              <ExTimeSelector radius="full" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExTimeSelector radius="default" />
<ExTimeSelector radius="full" />`}</ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Choose from multiple sizes to maintain visual consistency across different layouts and form densities.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-56">
              <ExTimeSelector size="xs" />
              <ExTimeSelector size="sm" />
              <ExTimeSelector size="md" />
              <ExTimeSelector size="lg" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTimeSelector size="xs" />
<ExTimeSelector size="sm" />
<ExTimeSelector size="md" />
<ExTimeSelector size="lg" />`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Add leading or trailing icons to improve recognition, provide additional context, or indicate available actions without
              changing the component's behavior.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5 max-w-56">
              <ExTimeSelector leftIcon={<Clock className="size-4" />} rightIcon={<Clock className="size-4" />} />

              <ExTimeSelector leftIcon={<Clock className="size-4" />} rightIcon={<ArrowRight className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTimeSelector leftIcon={<CalendarDays className="size-4" />} />

<ExTimeSelector
  leftIcon={<CalendarDays className="size-4" />}
  rightIcon={<ArrowRight className="size-4" />}
/>`}
          </ExCodeBlock>
        </section>

        <section id="state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">State</h3>
            <p className="text-muted text-md">
              Use visual states to communicate validation results, loading status, or input feedback, helping users understand the current
              status of the field at a glance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5 max-w-56">
              <ExTimeSelector disabled state="default" leftIcon={<Clock className="size-4" />} />
              <ExTimeSelector state="default" leftIcon={<Clock className="size-4" />} />

              <ExTimeSelector state="default" loading leftIcon={<Clock className="size-4" />} />

              <ExTimeSelector state="success" leftIcon={<Clock className="size-4" />} />

              <ExTimeSelector state="error" leftIcon={<Clock className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTimeSelector
  state="default"
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExTimeSelector
  state="default"
  loading
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExTimeSelector
  state="success"
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExTimeSelector
  state="error"
  leftIcon={<CalendarDays className="size-4" />}
/>`}
          </ExCodeBlock>
        </section>

        <section id="clearable" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Clearable</h3>
            <p className="text-muted text-md">
              Enable the clear button to allow users to remove the currently selected date with a single click, making it easier to correct
              or reset the field.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5 max-w-56">
              <ExTimeSelector clearable />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDatePicker clearable />`}</ExCodeBlock>
        </section>

        <section id="prefix-suffix" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Prefix & Suffix</h3>
            <p className="text-muted text-md">
              Prefix and suffix provide additional context around the selected time without modifying its value. They are commonly used for
              field labels, timezones, durations, or scheduling information.
            </p>
          </div>

          <ExCanvas>
            <div className="flex max-w-sm flex-col gap-5">
              <ExTimeSelector>
                <ExTimeSelector.Prefix>Start Time</ExTimeSelector.Prefix>
              </ExTimeSelector>

              <ExTimeSelector>
                <ExTimeSelector.Suffix>UTC+07:00</ExTimeSelector.Suffix>
              </ExTimeSelector>

              <ExTimeSelector radius="full">
                <ExTimeSelector.Prefix>Meeting</ExTimeSelector.Prefix>
                <ExTimeSelector.Suffix>60 min</ExTimeSelector.Suffix>
              </ExTimeSelector>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTimeSelector>
  <ExTimeSelector.Prefix>Start Time</ExTimeSelector.Prefix>
</ExTimeSelector>

<ExTimeSelector>
  <ExTimeSelector.Suffix>UTC+07:00</ExTimeSelector.Suffix>
</ExTimeSelector>

<ExTimeSelector radius="full">
  <ExTimeSelector.Prefix>Meeting</ExTimeSelector.Prefix>
  <ExTimeSelector.Suffix>60 min</ExTimeSelector.Suffix>
</ExTimeSelector>`}
          </ExCodeBlock>
        </section>

        <section id="format" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Format</h3>
            <p className="text-muted text-md">Choose a time using the default time selector format and style.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-56">
              <ExTimeSelector format={24} />
              <ExTimeSelector format={12} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">{`<ExTimeSelector format={24} />
<ExTimeSelector format={12} />`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
