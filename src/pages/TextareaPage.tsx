import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import ExTextarea from "../lib/components/Textarea/ExTextarea";
import { Info, MessageCircle, MessageSquareText, Smile, User } from "lucide-react";
import { useState } from "react";

export default function TextareaPage() {
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
      name: "Radius",
      link: "#radius",
    },
    {
      name: "Size",
      link: "#size",
    },
    {
      name: "Icon",
      link: "#icon",
    },
    {
      name: "State",
      link: "#state",
    },
    {
      name: "Debounce",
      link: "#debounce",
    },
    {
      name: "Clearable",
      link: "#clearable",
    },
    {
      name: "Prefix & Suffix",
      link: "#prefix-suffix",
    },
    {
      name: "Auto Resize",
      link: "#auto-resize",
    },
  ];

  const [valueExample, setValueExample] = useState("");

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Textarea</h2>
          <p>
            Textarea allows users to enter and edit multi-line text. It supports multiple sizes, validation states, icons, and compound
            components such as prefix and suffix to build flexible form experiences.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">Use the default textarea for collecting multi-line text.</p>
          </div>

          <ExCanvas>
            <div className="flex">
              <ExTextarea placeholder="Type something here..." />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExTextarea placeholder="Type something here..." />`}</ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">Choose the appropriate radius variant.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExTextarea rows={1} radius="default" placeholder="Type something here..." />
              <ExTextarea rows={1} radius="full" placeholder="Type something here..." />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTextarea rows={1} radius="default" placeholder="Type something here..." />
<ExTextarea rows={1} radius="full" placeholder="Type something here..." />`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">Choose the appropriate size to match the surrounding interface.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExTextarea size="xs" placeholder="Extra Small" />
              <ExTextarea size="sm" placeholder="Small" />
              <ExTextarea size="md" placeholder="Medium" />
              <ExTextarea size="lg" placeholder="Large" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTextarea size="xs" placeholder="Extra Small" />
<ExTextarea size="sm" placeholder="Small" />
<ExTextarea size="md" placeholder="Medium" />
<ExTextarea size="lg" placeholder="Large" />`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Icons provide visual context and help users quickly understand the purpose of the textarea.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExTextarea placeholder="Describe the issue..." leftIcon={<MessageSquareText className="size-4" />} />

              <ExTextarea placeholder="Leave additional notes..." rightIcon={<Info className="size-4" />} />

              <ExTextarea
                placeholder="Share your feedback..."
                leftIcon={<MessageCircle className="size-4" />}
                rightIcon={<Smile className="size-4" />}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTextarea
  placeholder="Describe the issue..."
  leftIcon={<MessageSquareText className="size-4" />}
/>

<ExTextarea
  placeholder="Leave additional notes..."
  rightIcon={<Info className="size-4" />}
/>

<ExTextarea
  placeholder="Share your feedback..."
  leftIcon={<MessageCircle className="size-4" />}
  rightIcon={<Smile className="size-4" />}
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
              <ExTextarea disabled state="default" placeholder="Default" leftIcon={<User className="size-4" />} />
              <ExTextarea state="default" placeholder="Default" leftIcon={<User className="size-4" />} />
              <ExTextarea state="default" placeholder="Loading" loading leftIcon={<User className="size-4" />} />
              <ExTextarea state="success" placeholder="Success" leftIcon={<User className="size-4" />} />

              <ExTextarea state="error" placeholder="Error" leftIcon={<User className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTextarea
  disabled
  state="default"
  placeholder="Default"
  leftIcon={<User className="size-4" />}
/>
<ExTextarea
  state="default"
  placeholder="Default"
  leftIcon={<User className="size-4" />}
/>
<ExTextarea
  state="default"
  placeholder="Loading"
  loading
  leftIcon={<User className="size-4" />}
/>
<ExTextarea
  state="success"
  placeholder="Success"
  leftIcon={<User className="size-4" />}
/>

<ExTextarea
  state="error"
  placeholder="Error"
  leftIcon={<User className="size-4" />}
/>`}
          </ExCodeBlock>
        </section>

        <section id="debounce" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Debounce</h3>
            <p className="text-muted text-md">Add a delay before updating the value.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExTextarea debounce={500} placeholder="Type something..." clearable onType={setValueExample} />
              <span>Debounce 500ms: {valueExample}</span>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTextarea
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
            <p className="text-muted text-md">Display a clear button to quickly remove the text value.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExTextarea debounce={500} placeholder="Type something..." clearable />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExTextarea placeholder="Type something..." clearable />`}</ExCodeBlock>
        </section>

        <section id="prefix-suffix" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Prefix & Suffix</h3>
            <p className="text-muted text-md">
              Prefix and suffix provide additional context such as labels, content types, or editing hints without affecting the textarea
              value.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExTextarea placeholder="Describe what you want the AI to generate...">
                <ExTextarea.Prefix>Prompt</ExTextarea.Prefix>
                <ExTextarea.Suffix>Markdown</ExTextarea.Suffix>
              </ExTextarea>

              <ExTextarea placeholder="Explain your issue in detail...">
                <ExTextarea.Prefix>Issue</ExTextarea.Prefix>
                <ExTextarea.Suffix>Required</ExTextarea.Suffix>
              </ExTextarea>

              <ExTextarea placeholder="Share your experience with this product...">
                <ExTextarea.Prefix>Review</ExTextarea.Prefix>
                <ExTextarea.Suffix>Public</ExTextarea.Suffix>
              </ExTextarea>

              <ExTextarea placeholder="Describe your changes...">
                <ExTextarea.Prefix>Commit</ExTextarea.Prefix>
                <ExTextarea.Suffix>Conventional</ExTextarea.Suffix>
              </ExTextarea>

              <ExTextarea placeholder='{"name":"John"}'>
                <ExTextarea.Prefix>JSON</ExTextarea.Prefix>
                <ExTextarea.Suffix>Valid</ExTextarea.Suffix>
              </ExTextarea>

              <ExTextarea placeholder="What's new in this release?">
                <ExTextarea.Prefix>Release Notes</ExTextarea.Prefix>
                <ExTextarea.Suffix>v2.0</ExTextarea.Suffix>
              </ExTextarea>

              <ExTextarea rows={1} placeholder="Type" radius="full" autoResize>
                <ExTextarea.Prefix>Release Notes</ExTextarea.Prefix>
                <ExTextarea.Suffix>v2.0</ExTextarea.Suffix>
              </ExTextarea>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTextarea placeholder="Describe what you want the AI to generate...">
  <ExTextarea.Prefix>Prompt</ExTextarea.Prefix>
  <ExTextarea.Suffix>Markdown</ExTextarea.Suffix>
</ExTextarea>

<ExTextarea placeholder="Explain your issue in detail...">
  <ExTextarea.Prefix>Issue</ExTextarea.Prefix>
  <ExTextarea.Suffix>Required</ExTextarea.Suffix>
</ExTextarea>

<ExTextarea placeholder="Share your experience with this product...">
  <ExTextarea.Prefix>Review</ExTextarea.Prefix>
  <ExTextarea.Suffix>Public</ExTextarea.Suffix>
</ExTextarea>

<ExTextarea placeholder="Describe your changes...">
  <ExTextarea.Prefix>Commit</ExTextarea.Prefix>
  <ExTextarea.Suffix>Conventional</ExTextarea.Suffix>
</ExTextarea>

<ExTextarea placeholder='{"name":"John"}'>
  <ExTextarea.Prefix>JSON</ExTextarea.Prefix>
  <ExTextarea.Suffix>Valid</ExTextarea.Suffix>
</ExTextarea>

<ExTextarea placeholder="What's new in this release?">
  <ExTextarea.Prefix>Release Notes</ExTextarea.Prefix>
  <ExTextarea.Suffix>v2.0</ExTextarea.Suffix>
</ExTextarea>

<ExTextarea rows={1} placeholder="Type" radius="full" autoResize>
  <ExTextarea.Prefix>Release Notes</ExTextarea.Prefix>
  <ExTextarea.Suffix>v2.0</ExTextarea.Suffix>
</ExTextarea>`}
          </ExCodeBlock>
        </section>

        <section id="auto-resize" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Auto Resize</h3>
            <p className="text-muted text-md">
              The textarea automatically adjusts its height based on the content, allowing users to see all the text without scrolling.
            </p>
          </div>

          <ExCanvas>
            <div className="flex">
              <ExTextarea rows={1} size="md" placeholder="Type something here..." autoResize />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExTextarea rows={1} size="md" placeholder="Type something here..." autoResize />`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
