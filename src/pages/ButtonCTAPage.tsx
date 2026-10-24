import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ExButton, ExButtonCTA, ExCodeBlock } from "@/lib";
import type { OnThisPage } from "@/shared/documentation/OnThisPageDocumentation";
import PageContent from "@/shared/documentation/PageContent";

const sections: OnThisPage[] = [
  { name: "Basic Usage", link: "#basic-usage" },
  { name: "Sizes", link: "#sizes" },
  { name: "Variants", link: "#variants" },
  { name: "States", link: "#states" },
];

export default function ButtonCTAPage() {
  const [clicks, setClicks] = useState(0);

  return (
    <PageContent section={sections}>
      <div className="flex w-full flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold">Button CTA</h1>
          <p className="mt-2 text-muted">The same button features with larger padding, height, and text for prominent actions.</p>
        </div>

        <section id="basic-usage" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Basic Usage</h2>
          <div className="flex flex-wrap items-center gap-4 rounded-md border border-border p-5">
            <ExButton>Regular Button</ExButton>
            <ExButtonCTA rightIcon={<ArrowRight size={20} />} onClick={() => setClicks((current) => current + 1)}>
              Get Started
            </ExButtonCTA>
            <output aria-live="polite" className="text-sm text-muted">Clicks: {clicks}</output>
          </div>
          <ExCodeBlock language="tsx">{`<ExButtonCTA rightIcon={<ArrowRight size={20} />} onClick={handleClick}>
  Get Started
</ExButtonCTA>`}</ExCodeBlock>
        </section>

        <section id="sizes" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <p className="text-muted">The default size is md.</p>
          <div className="flex flex-wrap items-center gap-4">
            {(["xs", "sm", "md", "lg"] as const).map((size) => (
              <ExButtonCTA key={size} size={size}>Size {size}</ExButtonCTA>
            ))}
          </div>
          <ExCodeBlock language="tsx">{`<ExButtonCTA size="xs">Extra Small</ExButtonCTA>
<ExButtonCTA size="sm">Small</ExButtonCTA>
<ExButtonCTA size="md">Medium</ExButtonCTA>
<ExButtonCTA size="lg">Large</ExButtonCTA>`}</ExCodeBlock>
        </section>

        <section id="variants" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Variants</h2>
          <div className="flex flex-wrap items-center gap-4">
            <ExButtonCTA variant="solid">Solid</ExButtonCTA>
            <ExButtonCTA variant="outline">Outline</ExButtonCTA>
            <ExButtonCTA variant="soft" color="success">Soft</ExButtonCTA>
            <ExButtonCTA radius="full" rightIcon={<ArrowRight size={20} />}>Continue</ExButtonCTA>
          </div>
          <ExCodeBlock language="tsx">{`<ExButtonCTA variant="solid">Solid</ExButtonCTA>
<ExButtonCTA variant="outline">Outline</ExButtonCTA>
<ExButtonCTA variant="soft" color="success">Soft</ExButtonCTA>
<ExButtonCTA radius="full" rightIcon={<ArrowRight size={20} />}>Continue</ExButtonCTA>`}</ExCodeBlock>
        </section>

        <section id="states" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">States</h2>
          <div className="flex flex-wrap items-center gap-4">
            <ExButtonCTA loading>Processing</ExButtonCTA>
            <ExButtonCTA disabled>Unavailable</ExButtonCTA>
            <ExButtonCTA iconOnly aria-label="Continue"><ArrowRight size={24} /></ExButtonCTA>
          </div>
          <ExCodeBlock language="tsx">{`<ExButtonCTA loading>Processing</ExButtonCTA>
<ExButtonCTA disabled>Unavailable</ExButtonCTA>
<ExButtonCTA iconOnly aria-label="Continue"><ArrowRight size={24} /></ExButtonCTA>`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
