import { useState } from "react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExComboBox from "../lib/components/ComboBox/ExComboBox";
import ExComboBoxItem from "../lib/components/ComboBox/ExComboBoxItem";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import type { ExOption } from "../lib/components/ComboBox/props/ExComboBoxItemProps";
import { ArrowRight, Earth, Search, Users } from "lucide-react";

export default function ComboBoxPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    {
      name: "Badge Variant",
      link: "#badge-variant",
    },
    { name: "Badge Color", link: "#badge-color" },
    { name: "Radius", link: "#radius" },
    { name: "Size", link: "#size" },
    { name: "Icon", link: "#icon" },
    { name: "State", link: "#state" },
    {
      name: "Multiple Selection",
      link: "#multiple-selection",
    },
    { name: "Clearable", link: "#clearable" },
    { name: "Debounce", link: "#debounce" },
    {
      name: "Custom Rendering",
      link: "#custom-rendering",
    },
    {
      name: "Disabled Options",
      link: "#disabled-options",
    },
    {
      name: "Prefix & Suffix",
      link: "#prefix-suffix",
    },
  ];

  const [selectedValue, setSelectedValue] = useState<ExOption<string>[]>([]);
  const [selectedValue2, setSelectedValue2] = useState<ExOption<string>[]>([]);
  const [valueDebounce, setValueDebounce] = useState<string>("");

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Combo Box</h2>
          <p>
            Combo Box combines a text input with a selectable list of options, allowing users to search, filter, and choose one or multiple
            items. It supports keyboard navigation, custom option rendering, validation states, icons, and other flexible behaviors for
            building rich form experiences.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex max-w-50">
              <ExComboBox placeholder="Choose country" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="badge-variant" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Badge Variant</h3>
            <p className="text-muted text-md">
              Customize the appearance of selected items in multiple selection mode using the <code>badgeVariant</code> prop. Choose from{" "}
              <code>solid</code>, <code>soft</code>, or <code>outline</code> to match your application's visual style.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox
                multiple
                badgeVariant="solid"
                placeholder="Choose country"
                selected={selectedValue}
                onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox multiple badgeVariant="soft" placeholder="Choose country" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox
                multiple
                badgeVariant="outline"
                placeholder="Choose country"
                selected={selectedValue}
                onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  multiple
  badgeVariant="solid"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>
<ExComboBox
  multiple
  badgeVariant="soft"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>
<ExComboBox
  multiple
  badgeVariant="outline"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="badge-color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Badge Color</h3>
            <p className="text-muted text-md">
              Customize the color of selected badges in multiple selection mode using the <code>badgeColor</code> prop. Choose from{" "}
              <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, or <code>danger</code> to
              communicate status or match your application's color scheme.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox
                multiple
                badgeColor="primary"
                placeholder="Choose country"
                selected={selectedValue}
                onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox
                multiple
                badgeColor="secondary"
                placeholder="Choose country"
                selected={selectedValue}
                onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox
                multiple
                badgeColor="warning"
                placeholder="Choose country"
                selected={selectedValue}
                onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox
                multiple
                badgeColor="success"
                placeholder="Choose country"
                selected={selectedValue}
                onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox multiple badgeColor="danger" placeholder="Choose country" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  multiple
  badgeColor="primary"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>
<ExComboBox
  multiple
  badgeColor="secondary"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>
<ExComboBox
  multiple
  badgeColor="warning"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>
<ExComboBox
  multiple
  badgeColor="success"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>
<ExComboBox
  multiple
  badgeColor="danger"
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox radius="default" multiple placeholder="Choose country" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox radius="full" multiple placeholder="Choose country" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  placeholder="Choose country"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
  <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
  <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox size="xs" multiple placeholder="Extra Small" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox size="sm" multiple placeholder="Extra Small" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox size="md" multiple placeholder="Extra Small" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
              <ExComboBox size="lg" multiple placeholder="Extra Small" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "indonesia" }} label="Indonesia" />
                <ExComboBoxItem value={{ id: "japan" }} label="Japan" />
                <ExComboBoxItem value={{ id: "malaysia" }} label="Malaysia" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox size="xs" placeholder="Extra Small" />
<ExComboBox size="sm" placeholder="Small" />
<ExComboBox size="md" placeholder="Medium" />
<ExComboBox size="lg" placeholder="Large" />`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox leftIcon={<Earth className="size-4" />} placeholder="Choose Country" />
              <ExComboBox rightIcon={<Users className="size-4" />} placeholder="Find Users" />
              <ExComboBox leftIcon={<Search className="size-4" />} rightIcon={<ArrowRight className="size-4" />} placeholder="Search..." />
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  leftIcon={<Earth className="size-4" />}
  placeholder="Choose Country"
/>
<ExComboBox
  rightIcon={<Users className="size-4" />}
  placeholder="Find Users"
/>
<ExComboBox
  leftIcon={<Search className="size-4" />}
  rightIcon={<ArrowRight className="size-4" />}
  placeholder="Search..."
/>`}
          </ExCodeBlock>
        </section>

        <section id="state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">State</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox disabled state="default" placeholder="Type to search" />
              <ExComboBox state="default" placeholder="Type to search" />
              <ExComboBox state="default" loading placeholder="Type to search" />
              <ExComboBox state="success" placeholder="Type to search" />
              <ExComboBox state="error" placeholder="Type to search" />
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox leftIcon={<Earth className="size-4" />} placeholder="Choose Country" />
<ExComboBox rightIcon={<Users className="size-4" />} placeholder="Find Users" />
<ExComboBox leftIcon={<Search className="size-4" />} rightIcon={<ArrowRight className="size-4" />} placeholder="Search..." />`}
          </ExCodeBlock>
        </section>

        <section id="multiple-selection" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Multiple Selection</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox multiple placeholder="Choose Item" selected={selectedValue2} onSelection={setSelectedValue2}>
                <ExComboBoxItem value={{ id: "1" }} label="Apple" />
                <ExComboBoxItem value={{ id: "2" }} label="Orange" />
                <ExComboBoxItem value={{ id: "3" }} label="Grape" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  multiple
  placeholder="Choose Item"
  selected={selectedValue2}
  onSelection={setSelectedValue2}
>
  <ExComboBoxItem value={{ id: "1" }} label="Apple" />
  <ExComboBoxItem value={{ id: "2" }} label="Orange" />
  <ExComboBoxItem value={{ id: "3" }} label="Grape" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="clearable" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Clearable</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox multiple clearable placeholder="Choose Item" selected={selectedValue2} onSelection={setSelectedValue2}>
                <ExComboBoxItem value={{ id: "1" }} label="Apple" />
                <ExComboBoxItem value={{ id: "2" }} label="Orange" />
                <ExComboBoxItem value={{ id: "3" }} label="Grape" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  multiple
  clearable
  placeholder="Choose Item"
  selected={selectedValue2}
  onSelection={setSelectedValue2}
>
  <ExComboBoxItem value={{ id: "1" }} label="Apple" />
  <ExComboBoxItem value={{ id: "2" }} label="Orange" />
  <ExComboBoxItem value={{ id: "3" }} label="Grape" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="debounce" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Debounce</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <span>Debounce 500ms: {valueDebounce}</span>
              <ExComboBox
                multiple
                clearable
                debounce={500}
                placeholder="Choose Item"
                selected={selectedValue2}
                onSelection={setSelectedValue2}
                onType={setValueDebounce}>
                <ExComboBoxItem value={{ id: "1" }} label="Apple" />
                <ExComboBoxItem value={{ id: "2" }} label="Orange" />
                <ExComboBoxItem value={{ id: "3" }} label="Grape" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  multiple
  clearable
  debounce={500}
  placeholder="Choose Item"
  selected={selectedValue}
  onSelection={setSelectedValue}
  onType={setValue}
>
  <ExComboBoxItem value={{ id: "1" }} label="Apple" />
  <ExComboBoxItem value={{ id: "2" }} label="Orange" />
  <ExComboBoxItem value={{ id: "3" }} label="Grape" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="custom-rendering" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Custom Rendering</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox clearable placeholder="Choose a framework" selected={selectedValue} onSelection={setSelectedValue}>
                <ExComboBoxItem value={{ id: "react" }} label="React">
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-3">
                      <img src="https://cdn.simpleicons.org/react" alt="React" className="size-5" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">React</span>
                        <span className="text-xs text-muted">JavaScript UI Library</span>
                      </div>
                    </div>
                    <span className="text-xs rounded bg-primary/10 px-2 py-1 text-primary">Meta</span>
                  </div>
                </ExComboBoxItem>

                <ExComboBoxItem value={{ id: "vue" }} label="Vue">
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-3">
                      <img src="https://cdn.simpleicons.org/vuedotjs" alt="Vue" className="size-5" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Vue</span>
                        <span className="text-xs text-muted">Progressive Framework</span>
                      </div>
                    </div>
                    <span className="text-xs rounded bg-success/10 px-2 py-1 text-success">Evan You</span>
                  </div>
                </ExComboBoxItem>

                <ExComboBoxItem value={{ id: "svelte" }} label="Svelte">
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-3">
                      <img src="https://cdn.simpleicons.org/svelte" alt="Svelte" className="size-5" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Svelte</span>
                        <span className="text-xs text-muted">Compiler-based Framework</span>
                      </div>
                    </div>
                    <span className="text-xs rounded bg-warning/10 px-2 py-1 text-warning">Rich Harris</span>
                  </div>
                </ExComboBoxItem>
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  clearable
  placeholder="Choose a framework"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "react" }} label="React">
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center gap-3">
        <img
          src="https://cdn.simpleicons.org/react"
          alt="React"
          className="size-5"
        />
        <div className="flex flex-col items-start">
          <span className="font-medium">React</span>
          <span className="text-xs text-muted">
            JavaScript UI Library
          </span>
        </div>
      </div>
      <span className="text-xs rounded bg-primary/10 px-2 py-1 text-primary">
        Meta
      </span>
    </div>
  </ExComboBoxItem>

  <ExComboBoxItem value={{ id: "vue" }} label="Vue">
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center gap-3">
        <img
          src="https://cdn.simpleicons.org/vuedotjs"
          alt="Vue"
          className="size-5"
        />
        <div className="flex flex-col items-start">
          <span className="font-medium">Vue</span>
          <span className="text-xs text-muted">
            Progressive Framework
          </span>
        </div>
      </div>
      <span className="text-xs rounded bg-success/10 px-2 py-1 text-success">
        Evan You
      </span>
    </div>
  </ExComboBoxItem>

  <ExComboBoxItem value={{ id: "svelte" }} label="Svelte">
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center gap-3">
        <img
          src="https://cdn.simpleicons.org/svelte"
          alt="Svelte"
          className="size-5"
        />
        <div className="flex flex-col items-start">
          <span className="font-medium">Svelte</span>
          <span className="text-xs text-muted">
            Compiler-based Framework
          </span>
        </div>
      </div>
      <span className="text-xs rounded bg-warning/10 px-2 py-1 text-warning">
        Rich Harris
      </span>
    </div>
  </ExComboBoxItem>
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="disabled-options" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Disabled Options</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-50">
              <ExComboBox multiple placeholder="Choose Item" selected={selectedValue2} onSelection={setSelectedValue2}>
                <ExComboBoxItem value={{ id: "1" }} label="Apple" />
                <ExComboBoxItem value={{ id: "2" }} disabled label="Orange" />
                <ExComboBoxItem value={{ id: "3" }} label="Grape" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  multiple
  placeholder="Choose Item"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBoxItem value={{ id: "1" }} label="Apple" />
  <ExComboBoxItem value={{ id: "2" }} disabled label="Orange" />
  <ExComboBoxItem value={{ id: "3" }} label="Grape" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>

        <section id="prefix-suffix" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Prefix & Suffix</h3>
            <p className="text-muted text-md">
              Use a Combo Box to let users search and select from a list of predefined options. Selection can be controlled through the{" "}
              <code>selected</code> and <code>onSelection</code> props.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-80">
              <ExComboBox multiple size="lg" placeholder="Choose Item" selected={selectedValue2} onSelection={setSelectedValue2}>
                <ExComboBox.Prefix>Fruits</ExComboBox.Prefix>
                <ExComboBox.Suffix>5 kg</ExComboBox.Suffix>
                <ExComboBoxItem value={{ id: "1" }} label="Apple" />
                <ExComboBoxItem value={{ id: "2" }} label="Orange" />
                <ExComboBoxItem value={{ id: "3" }} label="Grape" />
              </ExComboBox>
              <ExComboBox
                multiple
                size="lg"
                placeholder="Choose Item"
                radius="full"
                selected={selectedValue2}
                onSelection={setSelectedValue2}>
                <ExComboBox.Prefix>Fruits</ExComboBox.Prefix>
                <ExComboBox.Suffix>5 kg</ExComboBox.Suffix>
                <ExComboBoxItem value={{ id: "1" }} label="Apple" />
                <ExComboBoxItem value={{ id: "2" }} label="Orange" />
                <ExComboBoxItem value={{ id: "3" }} label="Grape" />
              </ExComboBox>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExComboBox
  multiple
  placeholder="Choose Item"
  selected={selectedValue}
  onSelection={setSelectedValue}
>
  <ExComboBox.Prefix>Fruits</ExComboBox.Prefix>
  <ExComboBox.Suffix>5 kg</ExComboBox.Suffix>
  <ExComboBoxItem value={{ id: "1" }} label="Apple" />
  <ExComboBoxItem value={{ id: "2" }} label="Orange" />
  <ExComboBoxItem value={{ id: "3" }} label="Grape" />
</ExComboBox>

<ExComboBox
  multiple
  size="lg"
  placeholder="Choose Item"
  radius="full"
  selected={selectedValue2}
  onSelection={setSelectedValue2}
>
  <ExComboBox.Prefix>Fruits</ExComboBox.Prefix>
  <ExComboBox.Suffix>5 kg</ExComboBox.Suffix>
  <ExComboBoxItem value={{ id: "1" }} label="Apple" />
  <ExComboBoxItem value={{ id: "2" }} label="Orange" />
  <ExComboBoxItem value={{ id: "3" }} label="Grape" />
</ExComboBox>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
