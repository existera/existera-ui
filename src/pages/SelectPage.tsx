import { BoomBox, Earth, User } from "lucide-react";
import { useState } from "react";
import type { SelectOption } from "../lib/components/Select/props/ExSelectProps";
import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExSelect from "../lib/components/Select/ExSelect";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function SelectPage() {
  const options: SelectOption[] = [
    { label: "Option One", value: "ONE" },
    { label: "Option Two", value: "TWO" },
  ];
  const [selected, setSelected] = useState<SelectOption | null>(null);
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Controlled Selection", link: "#controlled" },
    { name: "Radius", link: "#radius" },
    { name: "Size", link: "#size" },
    { name: "Icon", link: "#icon" },
    { name: "State", link: "#state" },
    { name: "Clearable", link: "#clearable" },
    { name: "Prefix & Suffix", link: "#prefix-suffix" },
  ];
  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Select</h2>
          <p>
            Select allows users to choose from a list of options. It supports multiple sizes, validation states, icons, and compound
            components such as prefix and suffix to build flexible form experiences.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">Choose from available options using the default select style.</p>
          </div>

          <ExCanvas>
            <div className="flex">
              <ExSelect
                placeholder="Select"
                option={[
                  {
                    label: "Option One",
                    value: "ONE",
                  },
                  {
                    label: "Option Two",
                    value: "Two",
                  },
                ]}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSelect
    placeholder="Select"
    option={[
      {
        label: "Option One",
        value: "ONE",
      },
      {
        label: "Option Two",
        value: "Two",
      },
    ]}
/>`}
          </ExCodeBlock>
        </section>

        <section id="controlled" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Controlled Selection</h3>
            <p className="text-muted text-md">
              Use selected with onChange to manage the selection in your parent.
              Clearing emits null. To set only an initial value, omit selected
              and use defaultSelected instead. Values must match an available option.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExSelect option={options} selected={selected} onChange={setSelected} clearable aria-label="Example selection" />
              <p>Selected: {selected?.label ?? "None"}</p>
              <div className="flex gap-2">
                <ExButton onClick={() => setSelected(options[1])}>Select Option Two</ExButton>
                <ExButton onClick={() => setSelected(null)} variant="outline">Reset</ExButton>
              </div>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`const options = [
  { label: "Option One", value: "ONE" },
  { label: "Option Two", value: "TWO" },
];
const [selected, setSelected] = useState<SelectOption | null>(null);

<ExSelect
  option={options}
  selected={selected}
  onChange={setSelected}
  clearable
/>

// Reset from the parent:
setSelected(null);

// Uncontrolled, with an initial selection:
<ExSelect option={options} defaultSelected={options[0]} onChange={console.log} />`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">Choose the appropriate radius variant.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExSelect
                radius="default"
                placeholder="Select"
                option={[
                  {
                    label: "Option One",
                    value: "ONE",
                  },
                  {
                    label: "Option Two",
                    value: "Two",
                  },
                ]}
              />
              <ExSelect
                radius="full"
                placeholder="Select"
                option={[
                  {
                    label: "Option One",
                    value: "ONE",
                  },
                  {
                    label: "Option Two",
                    value: "Two",
                  },
                ]}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSelect
    placeholder="Select"
    option={[
      {
        label: "Option One",
        value: "ONE",
      },
      {
        label: "Option Two",
        value: "Two",
      },
    ]}
/>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">Choose the appropriate size to match the surrounding interface.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExSelect size="xs" placeholder="Extra Small" />
              <ExSelect size="sm" placeholder="Small" />
              <ExSelect size="md" placeholder="Medium" />
              <ExSelect size="lg" placeholder="Large" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSelect size="xs" placeholder="Extra Small" />
<ExSelect size="sm" placeholder="Small" />
<ExSelect size="md" placeholder="Medium" />
<ExSelect size="lg" placeholder="Large" />`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">Icons help communicate the expected option or available actions.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExSelect leftIcon={<User className="size-4" />} />

              <ExSelect leftIcon={<Earth className="size-4" />} rightIcon={<BoomBox className="size-4 cursor-pointer" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSelect
  placeholder="Enter username"
  leftIcon={<User className="size-4" />}
/>

<ExSelect
  type="password"
  placeholder="Enter password"
  leftIcon={<Lock className="size-4" />}
  rightIcon={<Eye className="size-4 cursor-pointer" />}
/>`}
          </ExCodeBlock>
        </section>

        <section id="state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">State</h3>
            <p className="text-muted text-md">Display validation feedback using different visual states.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExSelect disabled state="default" placeholder="Default" leftIcon={<User className="size-4" />} />
              <ExSelect state="default" placeholder="Default" leftIcon={<User className="size-4" />} />
              <ExSelect state="default" placeholder="Loading" loading leftIcon={<User className="size-4" />} />
              <ExSelect state="success" placeholder="Success" leftIcon={<User className="size-4" />} />

              <ExSelect state="error" placeholder="Error" leftIcon={<User className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSelect
  disabled
  state="default"
  placeholder="Default"
  leftIcon={<User className="size-4" />}
/>
<ExSelect
  state="default"
  placeholder="Default"
  leftIcon={<User className="size-4" />}
/>
<ExSelect
  state="default"
  placeholder="Loading"
  loading
  leftIcon={<User className="size-4" />}
/>
<ExSelect
  state="success"
  placeholder="Success"
  leftIcon={<User className="size-4" />}
/>

<ExSelect
  state="error"
  placeholder="Error"
  leftIcon={<User className="size-4" />}
/>`}
          </ExCodeBlock>
        </section>

        <section id="clearable" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Clearable</h3>
            <p className="text-muted text-md">Display a clear button to quickly remove the current selected value.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExSelect
                placeholder="Select Item"
                option={[
                  {
                    label: "Option One",
                    value: "ONE",
                  },
                  {
                    label: "Option Two",
                    value: "Two",
                  },
                ]}
                clearable
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSelect placeholder="Select Item" 
  option={[
        {
          label: "Option One",
          value: "ONE",
        },
        {
          label: "Option Two",
          value: "Two",
        },
      ]} 
clearable />`}
          </ExCodeBlock>
        </section>

        <section id="prefix-suffix" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Prefix & Suffix</h3>
            <p className="text-muted text-md">
              Prefix and suffix can provide additional context such as icons, labels, or status indicators without changing the selected
              value.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExSelect
                placeholder="Select country"
                option={[
                  { label: "Indonesia", value: "ID" },
                  { label: "Singapore", value: "SG" },
                  { label: "Japan", value: "JP" },
                ]}>
                <ExSelect.Prefix>🌏</ExSelect.Prefix>
              </ExSelect>

              <ExSelect
                placeholder="Select currency"
                option={[
                  { label: "Indonesian Rupiah", value: "IDR" },
                  { label: "US Dollar", value: "USD" },
                  { label: "Japanese Yen", value: "JPY" },
                ]}>
                <ExSelect.Suffix>Required</ExSelect.Suffix>
              </ExSelect>

              <ExSelect
                placeholder="Select department"
                option={[
                  { label: "Engineering", value: "ENG" },
                  { label: "Finance", value: "FIN" },
                  { label: "Human Resources", value: "HR" },
                ]}>
                <ExSelect.Prefix>🏢</ExSelect.Prefix>
                <ExSelect.Suffix>Optional</ExSelect.Suffix>
              </ExSelect>

              <ExSelect
                radius="full"
                placeholder="Select department"
                option={[
                  { label: "Engineering", value: "ENG" },
                  { label: "Finance", value: "FIN" },
                  { label: "Human Resources", value: "HR" },
                ]}>
                <ExSelect.Prefix>🏢</ExSelect.Prefix>
                <ExSelect.Suffix>Optional</ExSelect.Suffix>
              </ExSelect>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExSelect
  placeholder="Select country"
  option={[
    { label: "Indonesia", value: "ID" },
    { label: "Singapore", value: "SG" },
    { label: "Japan", value: "JP" },
  ]}
>
  <ExSelect.Prefix>🌏</ExSelect.Prefix>
</ExSelect>

<ExSelect
  placeholder="Select currency"
  option={[
    { label: "Indonesian Rupiah", value: "IDR" },
    { label: "US Dollar", value: "USD" },
    { label: "Japanese Yen", value: "JPY" },
  ]}
>
  <ExSelect.Suffix>Required</ExSelect.Suffix>
</ExSelect>

<ExSelect
  placeholder="Select department"
  option={[
    { label: "Engineering", value: "ENG" },
    { label: "Finance", value: "FIN" },
    { label: "Human Resources", value: "HR" },
  ]}
>
  <ExSelect.Prefix>🏢</ExSelect.Prefix>
  <ExSelect.Suffix>Optional</ExSelect.Suffix>
</ExSelect>

<ExSelect
  radius="full"
  placeholder="Select department"
  option={[
    { label: "Engineering", value: "ENG" },
    { label: "Finance", value: "FIN" },
    { label: "Human Resources", value: "HR" },
  ]}
>
  <ExSelect.Prefix>🏢</ExSelect.Prefix>
  <ExSelect.Suffix>Optional</ExSelect.Suffix>
</ExSelect>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
