import { Save } from "lucide-react";
import { useId, useState } from "react";

import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExFooter from "../lib/components/Footer/ExFooter";
import ExHeader from "../lib/components/Header/ExHeader";
import ExInput from "../lib/components/Input/ExInput";
import ExModal from "../lib/components/Modal/ExModal";

import type {
  ModalSize,
  ModalVariant,
} from "../lib/components/Modal/types/ExModalType";

import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function ModalPage() {
  const titleId = useId();
  const descriptionId = useId();
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Variant", link: "#variant" },
    { name: "Size", link: "#size" },
    { name: "Overlay Behavior", link: "#overlay-behavior" },
    { name: "Close Button", link: "#close-button" },
    { name: "Header & Footer", link: "#header-footer" },
    { name: "Controlled State", link: "#controlled-state" },
    { name: "Accessibility", link: "#accessibility" },
  ];

  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<ModalVariant>("center");
  const [size, setSize] = useState<ModalSize>("auto");
  const [closeByOverlay, setCloseByOverlay] = useState(true);
  const [closeButton, setCloseButton] = useState(true);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Modal</h2>

          <p>
            Modal displays content above the current page and requires user
            interaction before returning to the underlying interface. It is
            ideal for confirmations, forms, and workflows that require focused
            attention.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>

            <p className="text-muted text-md">
              Display a modal by controlling its visibility with the{" "}
              <code>isOpen</code> prop.
            </p>
          </div>

          <ExCanvas>
            <ExButton onClick={() => setOpen(true)}>Open Modal</ExButton>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [open, setOpen] = useState(false);

<ExButton onClick={() => setOpen(true)}>
  Open Modal
</ExButton>

<ExModal
  isOpen={open}
  onClose={() => setOpen(false)}
>
  ...
</ExModal>`}
          </ExCodeBlock>
        </section>

        <section id="variant" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>

            <p className="text-muted text-md">
              Position the modal at the top, center, or bottom of the viewport.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-3">
              <ExButton
                onClick={() => {
                  setVariant("top");
                  setOpen(true);
                }}
              >
                Top
              </ExButton>

              <ExButton
                onClick={() => {
                  setVariant("center");
                  setOpen(true);
                }}
              >
                Center
              </ExButton>

              <ExButton
                onClick={() => {
                  setVariant("bottom");
                  setOpen(true);
                }}
              >
                Bottom
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExModal variant="top">
  ...
</ExModal>

<ExModal variant="center">
  ...
</ExModal>

<ExModal variant="bottom">
  ...
</ExModal>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>

            <p className="text-muted text-md">
              Choose between automatic sizing or fullscreen mode.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-3">
              <ExButton
                onClick={() => {
                  setSize("auto");
                  setOpen(true);
                }}
              >
                Auto
              </ExButton>

              <ExButton
                onClick={() => {
                  setSize("fullscreen");
                  setOpen(true);
                }}
              >
                Fullscreen
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExModal size="auto">
  ...
</ExModal>

<ExModal size="fullscreen">
  ...
</ExModal>`}
          </ExCodeBlock>
        </section>

        <section id="overlay-behavior" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Overlay Behavior</h3>

            <p className="text-muted text-md">
              Configure whether clicking the overlay closes the modal.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-3">
              <ExButton
                onClick={() => {
                  setCloseByOverlay(true);
                  setOpen(true);
                }}
              >
                Close by Overlay
              </ExButton>

              <ExButton
                onClick={() => {
                  setCloseByOverlay(false);
                  setOpen(true);
                }}
              >
                Persistent
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExModal closeByOverlay={true}>
  ...
</ExModal>

<ExModal closeByOverlay={false}>
  ...
</ExModal>`}
          </ExCodeBlock>
        </section>

        <section id="close-button" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Close Button</h3>

            <p className="text-muted text-md">
              Show or hide the built-in close button displayed in the top-right
              corner.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-3">
              <ExButton
                onClick={() => {
                  setCloseButton(true);
                  setOpen(true);
                }}
              >
                Show Close Button
              </ExButton>

              <ExButton
                onClick={() => {
                  setCloseButton(false);
                  setOpen(true);
                }}
              >
                Hide Close Button
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExModal closeButton={true}>
  ...
</ExModal>

<ExModal closeButton={false}>
  ...
</ExModal>`}
          </ExCodeBlock>
        </section>

        <section id="header-footer" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Header & Footer</h3>

            <p className="text-muted text-md">
              Combine ExHeader and ExFooter with scrollable content for a
              consistent modal layout.
            </p>
          </div>

          <ExCodeBlock language="tsx">
            {`<ExModal isOpen={open} onClose={() => setOpen(false)}>
  <ExHeader>
    Create New Item
  </ExHeader>

  <div className="flex-1 overflow-y-auto px-4 pb-5">
    ...
  </div>

  <ExFooter>
    <ExButton>Cancel</ExButton>
    <ExButton>Save</ExButton>
  </ExFooter>
</ExModal>`}
          </ExCodeBlock>
        </section>

        <section id="controlled-state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Controlled State</h3>

            <p className="text-muted text-md">
              Control the modal visibility using the <code>isOpen</code> prop
              and respond to close events with <code>onClose</code>.
            </p>
          </div>

          <ExCodeBlock language="tsx">
            {`const [open, setOpen] = useState(false);

<ExModal
  isOpen={open}
  onClose={() => setOpen(false)}
>
  ...
</ExModal>`}
          </ExCodeBlock>
        </section>
        <section id="accessibility" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Accessibility</h3>
            <p className="text-muted text-md">
              titleId references the visible heading, not the dialog itself. Focus
              stays inside the open modal and returns to its trigger on close.
              Escape closes the topmost modal. Use initialFocusRef and returnFocusRef
              when you need specific focus targets, or aria-label without a heading.
            </p>
          </div>
          <ExCodeBlock language="tsx">
            {`const titleId = useId();

<ExModal isOpen={open} onClose={() => setOpen(false)} titleId={titleId}>
  <ExHeader><span id={titleId}>Create New Item</span></ExHeader>
  {/* Modal content */}
</ExModal>`}
          </ExCodeBlock>
        </section>
      </div>

      <ExModal
        titleId={titleId}
        aria-describedby={descriptionId}
        isOpen={open}
        variant={variant}
        size={size}
        closeButton={closeButton}
        closeByOverlay={closeByOverlay}
        onClose={() => setOpen(false)}
      >
        <ExHeader>
          <span id={titleId}>Create New Item</span>
          <p id={descriptionId} className="mt-1 text-sm font-normal text-muted">
            Fill out the information below to create a new workspace item.
          </p>
        </ExHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-5 space-y-4">
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
      </ExModal>
    </PageContent>
  );
}
