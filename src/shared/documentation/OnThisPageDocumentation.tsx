import ExLink from "../../lib/components/Link/ExLink";

export interface OnThisPage {
  name: string;
  link: string;
}

interface OnThisPageDocumentationProps {
  section: OnThisPage[];
}

export default function OnThisPageDocumentation({
  section,
}: OnThisPageDocumentationProps) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted">On This Page</h3>
        <div className="flex flex-col gap-2">
          {section.map((item) => (
            <ExLink key={item.link} href={item.link}>
              {item.name}
            </ExLink>
          ))}
        </div>
      </div>
    </div>
  );
}
