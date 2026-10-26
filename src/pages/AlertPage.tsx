import { useState } from "react";
import { CheckCircle, Info, TriangleAlert } from "lucide-react";

import ExAlert from "../lib/components/Alert/ExAlert";
import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import PageContent from "../shared/documentation/PageContent";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";

export default function AlertPage() {
  const section: OnThisPage[] = [
    { name: "Padding", link: "#padding" },
    {
      name: "Introduction",
      link: "#intro",
    },
    {
      name: "Basic Usage",
      link: "#basic-usage",
    },
    {
      name: "Variant",
      link: "#variant",
    },
    {
      name: "Color",
      link: "#color",
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
      name: "Dismissible",
      link: "#alert",
    },
    {
      name: "Example",
      link: "#example",
    },
  ];

  const [alertOne, setAlertOne] = useState(true);
  const [alertTwo, setAlertTwo] = useState(true);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Alert</h2>
          <p>
            Alerts provide contextual feedback about important events, workflow updates, warnings, errors, and successful operations. They
            help users stay informed and respond appropriately to system changes.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">Display important workflow and system information using the default alert style.</p>
          </div>

          <ExCanvas>
            <div className="max-w-2xl">
              <ExAlert>
                <div className="font-medium">Purchase Order Submitted</div>
                <div>Purchase Order PO-2026-00124 has been submitted and is awaiting approval.</div>
              </ExAlert>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExAlert>
  <div className="font-medium">
    Purchase Order Submitted
  </div>
  <div>
    Purchase Order PO-2026-00124 has been submitted and is awaiting approval.
  </div>
</ExAlert>`}
          </ExCodeBlock>
        </section>

        <section id="variant" className="grid gap-5 section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">Choose between visual styles to match emphasis and hierarchy.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Solid</h4>

              <ExCanvas>
                <ExAlert variant="solid">
                  <div className="font-medium">Inventory Adjustment Required</div>
                  <div>Physical stock count differs from system inventory records.</div>
                </ExAlert>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAlert variant="solid">
  <div className="font-medium">
    Inventory Adjustment Required
  </div>
  <div>
    Physical stock count differs from system inventory records.
  </div>
</ExAlert>`}
              </ExCodeBlock>
            </div>

            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Soft</h4>

              <ExCanvas>
                <ExAlert variant="soft">
                  <div className="font-medium">Inventory Adjustment Required</div>
                  <div>Physical stock count differs from system inventory records.</div>
                </ExAlert>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAlert variant="soft">
  <div className="font-medium">
    Inventory Adjustment Required
  </div>
  <div>
    Physical stock count differs from system inventory records.
  </div>
</ExAlert>`}
              </ExCodeBlock>
            </div>
          </div>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">Apply semantic colors to communicate status and meaning.</p>
          </div>

          <ExCanvas>
            <div className="grid gap-3 max-w-2xl">
              <ExAlert color="primary">
                <div className="font-medium">Purchase Request Created</div>
              </ExAlert>

              <ExAlert color="secondary">
                <div className="font-medium">Document Saved as Draft</div>
              </ExAlert>

              <ExAlert color="success">
                <div className="font-medium">Payment Posted Successfully</div>
              </ExAlert>

              <ExAlert color="warning">
                <div className="font-medium">Inventory Reorder Required</div>
              </ExAlert>

              <ExAlert color="danger">
                <div className="font-medium">Invoice Validation Failed</div>
              </ExAlert>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExAlert color="primary">...</ExAlert>
<ExAlert color="secondary">...</ExAlert>
<ExAlert color="success">...</ExAlert>
<ExAlert color="warning">...</ExAlert>
<ExAlert color="danger">...</ExAlert>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">Select from predefined sizes to fit different layouts and content densities.</p>
          </div>

          <ExCanvas>
            <div className="flex max-w-xl flex-col gap-3">
              <ExAlert size="xs" title="Extra Small" icon={<TriangleAlert strokeWidth={3} size={12} />}>
                Item SKU-LAN-001 is below minimum stock.
              </ExAlert>

              <ExAlert size="sm" title="Small" icon={<TriangleAlert strokeWidth={3} size={14} />}>
                Item SKU-LAN-001 is below minimum stock.
              </ExAlert>

              <ExAlert size="md" title="Medium" icon={<TriangleAlert strokeWidth={3} size={16} />}>
                Item SKU-LAN-001 is below minimum stock.
              </ExAlert>

              <ExAlert size="lg" title="Large" icon={<TriangleAlert strokeWidth={3} size={18} />}>
                Item SKU-LAN-001 is below minimum stock.
              </ExAlert>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExAlert
  size="md"
  title="Medium"
  icon={<TriangleAlert />}
>
  Item SKU-LAN-001 is below minimum stock.
</ExAlert>`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">Enhance recognition and provide additional visual context with icons.</p>
          </div>

          <ExCanvas>
            <div className="grid gap-3 max-w-2xl">
              <ExAlert color="primary" icon={<Info size={16} strokeWidth={3} />}>
                <div className="font-medium">Approval Required</div>
                <div>Purchase Order PO-2026-00124 requires manager approval.</div>
              </ExAlert>

              <ExAlert color="success" icon={<CheckCircle size={16} strokeWidth={3} />}>
                <div className="font-medium">Goods Receipt Completed</div>
                <div>Warehouse receipt GR-2026-00891 has been posted successfully.</div>
              </ExAlert>

              <ExAlert color="danger" icon={<TriangleAlert size={16} strokeWidth={3} />}>
                <div className="font-medium">Budget Limit Exceeded</div>
                <div>This purchase request exceeds the department budget threshold.</div>
              </ExAlert>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExAlert
  color="primary"
  icon={<Info size={16} />}
>
  <div className="font-medium">
    Approval Required
  </div>
  <div>
    Purchase Order PO-2026-00124 requires manager approval.
  </div>
</ExAlert>`}
          </ExCodeBlock>
        </section>

        <section id="dismissible" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Dismissible</h3>
            <p className="text-muted text-md">Allow users to dismiss temporary notifications and status messages.</p>
          </div>

          <ExCanvas>
            <div className="grid gap-4 max-w-2xl">
              {alertOne ? (
                <ExAlert dismissible onDismiss={() => setAlertOne(false)}>
                  <div className="font-medium">Journal Posted</div>
                  <div>Financial journal JV-2026-00034 has been posted successfully.</div>
                </ExAlert>
              ) : (
                <ExButton onClick={() => setAlertOne(true)}>Show Alert</ExButton>
              )}

              {alertTwo ? (
                <ExAlert color="success" dismissible onDismiss={() => setAlertTwo(false)}>
                  <div className="font-medium">Payment Completed</div>
                  <div>Vendor payment for INV-2026-00087 has been processed.</div>
                </ExAlert>
              ) : (
                <ExButton color="success" onClick={() => setAlertTwo(true)}>
                  Show Alert
                </ExButton>
              )}
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExAlert
  dismissible
  onDismiss={() => {}}
>
  <div className="font-medium">
    Journal Posted
  </div>
  <div>
    Financial journal JV-2026-00034 has been posted successfully.
  </div>
</ExAlert>`}
          </ExCodeBlock>
        </section>

        <section id="example" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Example</h3>
            <p className="text-muted text-md">Common examples used across procurement, inventory, finance, and approval workflows.</p>
          </div>

          <ExCanvas>
            <div className="grid gap-3 max-w-2xl">
              <ExAlert color="warning" icon={<TriangleAlert strokeWidth={3} size={16} />}>
                <div className="font-medium">Stock Reorder Point Reached</div>
                <div>CAT6 Cable (SKU-LAN-001) has reached its minimum stock threshold.</div>
              </ExAlert>

              <ExAlert color="primary" icon={<Info strokeWidth={3} size={16} />}>
                <div className="font-medium">Approval Pending</div>
                <div>Purchase Order PO-2026-00124 is waiting for approval from Procurement Manager.</div>
              </ExAlert>

              <ExAlert color="danger" icon={<TriangleAlert strokeWidth={3} size={16} />}>
                <div className="font-medium">Invoice Mismatch</div>
                <div>Invoice amount differs from the approved Purchase Order.</div>
              </ExAlert>

              <ExAlert color="success" icon={<CheckCircle strokeWidth={3} size={16} />}>
                <div className="font-medium">Payment Completed</div>
                <div>Vendor payment for INV-2026-00087 has been processed successfully.</div>
              </ExAlert>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">
            {`<ExAlert color="warning">
  <div className="font-medium">
    Stock Reorder Point Reached
  </div>
  <div>
    CAT6 Cable (SKU-LAN-001) has reached its minimum stock threshold.
  </div>
</ExAlert>`}
          </ExCodeBlock>
        </section>
      </div>
        <section id="padding" className="section-anchor mt-8">
          <h2 className="mb-4 text-xl font-semibold">Padding</h2>
          <p className="mb-4 text-sm text-muted">Alerts have square corners. Use padding independently from the text size; the default padding is m.</p>
          <div className="grid gap-4">
            {(["s", "m", "l"] as const).map((padding) => (
              <ExAlert key={padding} padding={padding} variant="soft" title={`Padding ${padding}`}>
                Square alert with {padding} padding.
              </ExAlert>
            ))}
          </div>
          <ExCodeBlock language="tsx">{'<ExAlert padding="s" />\n<ExAlert padding="m" />\n<ExAlert padding="l" />'}</ExCodeBlock>
        </section>
    </PageContent>
  );
}
