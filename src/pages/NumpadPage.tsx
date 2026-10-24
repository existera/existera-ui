import { useState } from "react";
import { ExButton, ExCodeBlock, ExNumpad } from "@/lib";
import type { OnThisPage } from "@/shared/documentation/OnThisPageDocumentation";
import PageContent from "@/shared/documentation/PageContent";

const sections: OnThisPage[] = [
  { name: "Basic Usage", link: "#basic-usage" },
  { name: "Sizes", link: "#sizes" },
  { name: "Disabled", link: "#disabled" },
];

export default function NumpadPage() {
  const [value, setValue] = useState("");

  return (
    <PageContent section={sections}>
      <div className="flex w-full flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold">Numpad</h1>
          <p className="mt-2 text-muted">A compact number pad with keys from 0 to 9.</p>
        </div>

        <section id="basic-usage" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Basic Usage</h2>
          <div className="flex flex-col items-start gap-4 rounded-md border border-border p-5">
            <output aria-live="polite" aria-label="Entered numbers" className="min-h-8 max-w-full break-all text-2xl tabular-nums">
              {value || "Press a number"}
            </output>
            <ExNumpad
              onPress={(number) => setValue((current) => current + number)}
              onBackspace={() => setValue((current) => current.slice(0, -1))}
            />
            <ExButton variant="outline" onClick={() => setValue("")}>Clear</ExButton>
          </div>
          <ExCodeBlock language="tsx">{`const [value, setValue] = useState("");

<ExNumpad
  onPress={(number) => setValue((current) => current + number)}
  onBackspace={() => setValue((current) => current.slice(0, -1))}
/>`}</ExCodeBlock>
        </section>

        <section id="sizes" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <div className="flex flex-wrap items-start gap-8">
            {(["s", "m", "l"] as const).map((size) => (
              <div key={size} className="flex flex-col gap-3">
                <span className="text-sm text-muted">Size {size}</span>
                <ExNumpad size={size} />
              </div>
            ))}
          </div>
          <ExCodeBlock language="tsx">{`<ExNumpad size="s" />
<ExNumpad size="m" />
<ExNumpad size="l" />`}</ExCodeBlock>
        </section>

        <section id="disabled" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Disabled</h2>
          <ExNumpad disabled />
          <ExCodeBlock language="tsx">{"<ExNumpad disabled />"}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
