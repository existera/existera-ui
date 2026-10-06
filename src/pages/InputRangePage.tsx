import ExInputRange from "@/lib/components/InputRange/ExInputRange";
import { OnThisPage } from "@/shared/documentation/OnThisPageDocumentation";
import PageContent from "@/shared/documentation/PageContent";
import { Volume2 } from "lucide-react";

export default function InputRangePage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
  ];
  return (
    <PageContent section={section}>
      <div className="w-full">
        <h1>Input Range</h1>
        <div className="grid gap-5">
          <ExInputRange disabled size="sm" showLabels />
          <ExInputRange disabled size="md" showLabels />
          <ExInputRange disabled color="danger" size="lg" showLabels />
          <ExInputRange defaultValue={50} thumbContent={<Volume2 size={10} strokeWidth={2.5} />} />
          <ExInputRange defaultValue={50} thumbContent={<span className="text-[9px] font-bold"> + </span>} />
          <ExInputRange orientation="vertical" defaultValue={50} className="h-40" thumbContent="+" showLabels />
          <ExInputRange showLabels labels={["Low", "Medium", "High"]} defaultValue={50} onChange={(value) => console.log(value)} />
        </div>
      </div>
    </PageContent>
  );
}
