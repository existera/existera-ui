import { Eye, Lock, User } from "lucide-react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExInput from "../lib/components/Input/ExInput";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import { useState } from "react";

export default function InputPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Radius", link: "#radius" },
    { name: "Size", link: "#size" },
    { name: "Icon", link: "#icon" },
    { name: "State", link: "#state" },
    { name: "Debounce", link: "#debounce" },
    { name: "Clearable", link: "#clearable" },
    { name: "Prefix & Suffix", link: "#prefix-suffix" },
  ];

  const [valueExample, setValueExample] = useState("");
  const [show, setShow] = useState(false);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Input</h2>
          <p>
            Input allows users to enter and edit text. It supports multiple sizes, validation states, icons, and compound components such as
            prefix and suffix to build flexible form experiences.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">Use the default input for collecting a single line of text.</p>
          </div>
          <ExCanvas>
            <div className="flex">
              <ExInput id="identifier" clearable placeholder="Email or username"/>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">{`<ExInput placeholder="Type something here..." />`}</ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">Use the default input for collecting a single line of text.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExInput radius="default" placeholder="Type something here..." />
              <ExInput radius="full" placeholder="Type something here..." />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExInput radius="default" placeholder="Type something here..." />
<ExInput radius="full" placeholder="Type something here..." />`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">Choose the appropriate size to match the surrounding interface.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExInput size="xs" placeholder="Extra Small" />
              <ExInput size="sm" placeholder="Small" />
              <ExInput size="md" placeholder="Medium" />
              <ExInput size="lg" placeholder="Large" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExInput size="xs" placeholder="Extra Small" />
<ExInput size="sm" placeholder="Small" />
<ExInput size="md" placeholder="Medium" />
<ExInput size="lg" placeholder="Large" />`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">Icons help communicate the expected input or available actions.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExInput placeholder="Enter username" leftIcon={<User className="size-4" />} />

              <ExInput
                type={show ? "text" : "password"}
                placeholder="Enter password"
                leftIcon={<Lock className="size-4" />}
                rightIcon={<Eye className="size-4 cursor-pointer" onClick={() => setShow(!show)} />}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExInput
  placeholder="Enter username"
  leftIcon={<User className="size-4" />}
/>

<ExInput
  type={show ? "text" : "password"}
  placeholder="Enter password"
  leftIcon={<Lock className="size-4" />}
  rightIcon={<Eye className="size-4 cursor-pointer" onClick={() => setShow(!show)} />}
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
              <ExInput disabled state="default" clearable value="50" placeholder="Disabled" leftIcon={<User className="size-4" />} />
              <ExInput state="default" placeholder="Default" leftIcon={<User className="size-4" />} />
              <ExInput state="default" placeholder="Loading" loading leftIcon={<User className="size-4" />} />
              <ExInput state="success" placeholder="Success" leftIcon={<User className="size-4" />} />

              <ExInput state="error" placeholder="Error" leftIcon={<User className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExInput
  disabled
  placeholder="Default"
  leftIcon={<User className="size-4" />}
/>
<ExInput
  state="default"
  placeholder="Default"
  leftIcon={<User className="size-4" />}
/>
<ExInput
  state="default"
  placeholder="Loading"
  loading
  leftIcon={<User className="size-4" />}
/>
<ExInput
  state="success"
  placeholder="Success"
  leftIcon={<User className="size-4" />}
/>
<ExInput
  state="error"
  placeholder="Error"
  leftIcon={<User className="size-4" />}
/>`}
          </ExCodeBlock>
        </section>

        <section id="debounce" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Debounce</h3>
            <p className="text-muted text-md">
              Debounce allows you to delay the execution of a function until a certain amount of time has passed since the last time it was
              invoked. This is useful for optimizing performance and reducing unnecessary function calls, especially in scenarios like
              search input or live validation.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExInput debounce={500} placeholder="Type something..." clearable onType={setValueExample} />
              <span>Debounce 500ms: {valueExample}</span>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExInput
  debounce={500}
  placeholder="Type something..."
  clearable
  onType={setValueExample}
/>`}
          </ExCodeBlock>
        </section>

        <section id="clearable" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Clearable</h3>
            <p className="text-muted text-md">Display a clear button to quickly remove the current input value.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExInput placeholder="Type something..." clearable />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExInput placeholder="Type something..." clearable />`}</ExCodeBlock>
        </section>

        <section id="prefix-suffix" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Prefix & Suffix</h3>
            <p className="text-muted text-md">
              Prefix and suffix provide additional context such as units, labels, or actions without affecting the input value.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExInput placeholder="Type something here..." radius="full">
                <ExInput.Prefix>https://</ExInput.Prefix>
              </ExInput>

              <ExInput placeholder="Amount">
                <ExInput.Suffix>.00</ExInput.Suffix>
              </ExInput>

              <ExInput placeholder="Website" radius="full">
                <ExInput.Prefix>https://</ExInput.Prefix>
                <ExInput.Suffix>.com</ExInput.Suffix>
              </ExInput>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExInput placeholder="Type something here...">
  <ExInput.Prefix>https://</ExInput.Prefix>
</ExInput>

<ExInput placeholder="Amount">
  <ExInput.Suffix>.00</ExInput.Suffix>
</ExInput>

<ExInput placeholder="Website">
  <ExInput.Prefix>https://</ExInput.Prefix>
  <ExInput.Suffix>.com</ExInput.Suffix>
</ExInput>

<ExInput placeholder="Website" radius="full">
  <ExInput.Prefix>https://</ExInput.Prefix>
  <ExInput.Suffix>.com</ExInput.Suffix>
</ExInput>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
