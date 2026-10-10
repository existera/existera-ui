import { Save } from "lucide-react";
import { useState } from "react";

import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExFlyout from "../lib/components/Flyout/ExFlyout";
import ExFooter from "../lib/components/Footer/ExFooter";
import ExHeader from "../lib/components/Header/ExHeader";
import ExInput from "../lib/components/Input/ExInput";

import type {
  FlyoutSide,
  FlyoutSize,
} from "../lib/components/Flyout/types/ExFlyoutType";

import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function FlyoutPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Side", link: "#side" },
    { name: "Size", link: "#size" },
    { name: "Overlay Behavior", link: "#overlay-behavior" },
    { name: "Header & Footer", link: "#header-footer" },
    { name: "Controlled State", link: "#controlled-state" },
  ];

  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<FlyoutSide>("right");
  const [size, setSize] = useState<FlyoutSize>("fit");
  const [closeByOverlay, setCloseByOverlay] = useState(true);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Flyout</h2>
          <p>
            Flyout displays temporary content in a sliding panel attached to the
            edge of the screen. It is commonly used for forms, settings,
            previews, and other contextual workflows without interrupting the
            current page.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>

            <p className="text-muted text-md">
              Use a Flyout to present additional content while keeping users in
              the current context.
            </p>
          </div>

          <ExCanvas>
            <ExButton color="primary" onClick={() => setOpen(true)}>
              Open Flyout
            </ExButton>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [open, setOpen] = useState(false);

<ExButton onClick={() => setOpen(true)}>
  Open Flyout
</ExButton>

<ExFlyout
  isOpen={open}
  onClose={() => setOpen(false)}
>
  <ExHeader>
    Create Item
  </ExHeader>

  <div className="flex-1 overflow-y-auto p-5">
    ...
  </div>

  <ExFooter>
    ...
  </ExFooter>
</ExFlyout>`}
          </ExCodeBlock>
        </section>

        <section id="side" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Side</h3>

            <p className="text-muted text-md">
              Control which side of the viewport the Flyout enters from.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExButton
                color="primary"
                onClick={() => {
                  setSide("left");
                  setOpen(true);
                }}
              >
                Open Left Flyout
              </ExButton>

              <ExButton
                color="primary"
                onClick={() => {
                  setSide("right");
                  setOpen(true);
                }}
              >
                Open Right Flyout
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExFlyout side="left">
  ...
</ExFlyout>

<ExFlyout side="right">
  ...
</ExFlyout>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Adjust the Flyout width to suit your content on desktop. The{" "}
              <code>size</code> prop only affects desktop layouts. On mobile
              devices, the Flyout always uses a responsive width of{" "}
              <code>80dvw</code> to provide a consistent and comfortable viewing
              experience, regardless of the selected size.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExButton
                color="primary"
                onClick={() => {
                  setSize("half");
                  setOpen(true);
                }}
              >
                Half Width
              </ExButton>

              <ExButton
                color="primary"
                onClick={() => {
                  setSize("fit");
                  setOpen(true);
                }}
              >
                Fit Content
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExFlyout size="half">
  ...
</ExFlyout>

<ExFlyout size="fit">
  ...
</ExFlyout>`}
          </ExCodeBlock>
        </section>

        <section id="overlay-behavior" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Overlay Behavior</h3>

            <p className="text-muted text-md">
              Choose whether clicking outside the Flyout should close it.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExButton
                color="primary"
                onClick={() => {
                  setCloseByOverlay(true);
                  setOpen(true);
                }}
              >
                Close on Overlay Click
              </ExButton>

              <ExButton
                color="primary"
                onClick={() => {
                  setCloseByOverlay(false);
                  setOpen(true);
                }}
              >
                Persistent Flyout
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExFlyout closeByOverlay={true}>
  ...
</ExFlyout>

<ExFlyout closeByOverlay={false}>
  ...
</ExFlyout>`}
          </ExCodeBlock>
        </section>

        <section id="header-footer" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Header & Footer</h3>

            <p className="text-muted text-md">
              Use ExHeader and ExFooter to create a consistent layout with fixed
              actions while allowing the content area to scroll.
            </p>
          </div>

          <ExCodeBlock language="tsx">
            {`<ExFlyout>

  <ExHeader>
    Create New Item
  </ExHeader>

  <div className="flex-1 overflow-y-auto p-5">
    ...
  </div>

  <ExFooter>
    <ExButton>Cancel</ExButton>
    <ExButton>Save</ExButton>
  </ExFooter>

</ExFlyout>`}
          </ExCodeBlock>
        </section>

        <section id="controlled-state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Controlled State</h3>

            <p className="text-muted text-md">
              Flyout visibility is fully controlled through the{" "}
              <code>isOpen</code> prop together with the <code>onClose</code>{" "}
              callback.
            </p>
          </div>

          <ExCodeBlock language="tsx">
            {`const [open, setOpen] = useState(false);

<ExFlyout
  isOpen={open}
  onClose={() => setOpen(false)}
>
  ...
</ExFlyout>`}
          </ExCodeBlock>
        </section>
      </div>

      <ExFlyout
        isOpen={open}
        side={side}
        size={size}
        closeByOverlay={closeByOverlay}
        onClose={() => setOpen(false)}
      >
        <ExHeader>
          Create New Item
          <p className="mt-2 text-sm font-normal text-muted">
            Fill out the information below to create a new workspace item.
          </p>
        </ExHeader>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <ExInput placeholder="Item name" />
          <ExInput placeholder="Category" />
          <ExInput placeholder="Owner" />
          <ExInput placeholder="Description" />
        </div>

        <ExFooter>
          <ExButton
            color="secondary"
            variant="soft"
            onClick={() => setOpen(false)}
          >
            Cancel
          </ExButton>

          <ExButton
            color="primary"
            leftIcon={<Save size={16} />}
            onClick={() => setOpen(false)}
          >
            Save
          </ExButton>
        </ExFooter>
      </ExFlyout>
    </PageContent>
  );
}
