import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function CodeBlockPage() {
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
      name: "Theme",
      link: "#theme",
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
      name: "Line Numbers",
      link: "#line-numbers",
    },
  ];

  const code = `function hello(name: string) {
  console.log(\`Hello \${name}\`);
}

hello("ORCA");`;

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Code Block</h2>
          <p>
            Display formatted source code with syntax highlighting, optional
            line numbers, multiple themes, and a built-in copy button. Code
            blocks are ideal for documentation, tutorials, and API references.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Render formatted code using the default appearance.
            </p>
          </div>

          <ExCanvas>
            <ExCodeBlock language="tsx">{code}</ExCodeBlock>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`const code = \`function hello(name: string) {
  console.log(\`Hello \${name}\`);
}

hello("ORCA");\`;

<ExCodeBlock language="tsx">
  {code}
</ExCodeBlock>`}</ExCodeBlock>
        </section>

        <section id="theme" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Theme</h3>
            <p className="text-muted text-md">
              Choose from Prism themes to match your application.
            </p>
          </div>

          <ExCanvas>
            <div className="grid md:grid-cols-2 gap-4">
              <ExCodeBlock language="tsx" theme="oneDark">
                {code}
              </ExCodeBlock>

              <ExCodeBlock language="tsx" theme="nightOwl">
                {code}
              </ExCodeBlock>

              <ExCodeBlock language="tsx" theme="dracula">
                {code}
              </ExCodeBlock>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExCodeBlock language="tsx" theme="oneDark">
  {code}
</ExCodeBlock>

<ExCodeBlock language="tsx" theme="nightOwl">
  {code}
</ExCodeBlock>

<ExCodeBlock language="tsx" theme="dracula">
  {code}
</ExCodeBlock>`}</ExCodeBlock>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Apply semantic colors to the code block container.
            </p>
          </div>

          <ExCanvas>
            <div className="grid md:grid-cols-2 gap-4">
              <ExCodeBlock color="default">{code}</ExCodeBlock>
              <ExCodeBlock color="primary">{code}</ExCodeBlock>
              <ExCodeBlock color="success">{code}</ExCodeBlock>
              <ExCodeBlock color="warning">{code}</ExCodeBlock>
              <ExCodeBlock color="danger">{code}</ExCodeBlock>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExCodeBlock color="default">
  {code}
</ExCodeBlock>

<ExCodeBlock color="primary">
  {code}
</ExCodeBlock>

<ExCodeBlock color="success">
  {code}
</ExCodeBlock>

<ExCodeBlock color="warning">
  {code}
</ExCodeBlock>

<ExCodeBlock color="danger">
  {code}
</ExCodeBlock>`}</ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Adjust spacing and typography using the available sizes.
            </p>
          </div>

          <ExCanvas>
            <div className="grid md:grid-cols-2 gap-4">
              <ExCodeBlock size="xs">{code}</ExCodeBlock>
              <ExCodeBlock size="sm">{code}</ExCodeBlock>
              <ExCodeBlock size="md">{code}</ExCodeBlock>
              <ExCodeBlock size="lg">{code}</ExCodeBlock>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExCodeBlock size="xs">
  {code}
</ExCodeBlock>

<ExCodeBlock size="sm">
  {code}
</ExCodeBlock>

<ExCodeBlock size="md">
  {code}
</ExCodeBlock>

<ExCodeBlock size="lg">
  {code}
</ExCodeBlock>`}</ExCodeBlock>
        </section>

        <section id="line-numbers" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Line Numbers</h3>
            <p className="text-muted text-md">
              Show or hide line numbers depending on your preference.
            </p>
          </div>

          <ExCanvas>
            <div className="grid md:grid-cols-2 gap-4">
              <ExCodeBlock showLineNumbers>{code}</ExCodeBlock>

              <ExCodeBlock showLineNumbers={false}>{code}</ExCodeBlock>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExCodeBlock showLineNumbers>
  {code}
</ExCodeBlock>

<ExCodeBlock showLineNumbers={false}>
  {code}
</ExCodeBlock>`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
