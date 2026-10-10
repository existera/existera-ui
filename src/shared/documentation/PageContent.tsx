import type { ReactNode } from "react";
import OnThisPageDocumentation, {
  type OnThisPage,
} from "./OnThisPageDocumentation";
import RootFooter from "../root/RootFooter";

export default function PageContent({
  section,
  children,
}: {
  section: OnThisPage[];
  children: ReactNode;
}) {
  return (
    <>
      <div className="col-span-5 grid gap-5 md:mx-5 mt-5">
        {children}
        <RootFooter />
      </div>
      <div className="sticky top-20 self-start pl-5 hidden md:block">
        <OnThisPageDocumentation section={section} />
      </div>
    </>
  );
}
