import { useState } from "react";
import { ExCodeBlock, ExOtp } from "@/lib";
import type { OnThisPage } from "@/shared/documentation/OnThisPageDocumentation";
import PageContent from "@/shared/documentation/PageContent";

export default function ExOtpPage() {
  const [value, setValue] = useState("");
  const section: OnThisPage[] = [
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Digits", link: "#digits" },
    { name: "Sizes", link: "#sizes" },
    { name: "States", link: "#states" },
  ];
  return (
    <PageContent section={section}>
      <div className="flex w-full flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold">OTP</h1>
          <p className="mt-2 text-muted">Numeric OTP input with automatic focus and paste support.</p>
        </div>

        <section id="basic-usage" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Basic Usage</h2>
          <p className="text-muted">Defaults to 4 digits, medium size, and the default state.</p>
          <div className="flex flex-col items-start gap-4 rounded-md border border-border p-5">
            <ExOtp onChange={setValue} />
            <output aria-live="polite" className="text-sm text-muted">Value: {value || "Empty"}</output>
          </div>
          <ExCodeBlock language="tsx">{`const [value, setValue] = useState("");

<ExOtp onChange={setValue} />`}</ExCodeBlock>
        </section>

        <section id="digits" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Digits</h2>
          <ExOtp digit={6} />
          <ExCodeBlock language="tsx">{'<ExOtp digit={6} />'}</ExCodeBlock>
        </section>

        <section id="sizes" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <div className="flex flex-wrap items-start gap-8">
            {(["s", "m", "l"] as const).map((size) => (
              <div key={size} className="flex flex-col gap-3">
                <span className="text-sm text-muted">Size {size}</span>
                <ExOtp size={size} />
              </div>
            ))}
          </div>
          <ExCodeBlock language="tsx">{`<ExOtp size="s" />
<ExOtp size="m" />
<ExOtp size="l" />`}</ExCodeBlock>
        </section>

        <section id="states" className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">States</h2>
          <div className="flex flex-wrap items-start gap-8">
            {(["default", "success", "error"] as const).map((state) => (
              <div key={state} className="flex flex-col gap-3">
                <span className="text-sm text-muted">{state}</span>
                <ExOtp state={state} />
              </div>
            ))}
          </div>
          <ExCodeBlock language="tsx">{`<ExOtp state="default" />
<ExOtp state="success" />
<ExOtp state="error" />`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
