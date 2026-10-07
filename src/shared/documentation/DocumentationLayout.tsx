import { Outlet } from "react-router-dom";
import SidebarDocumentation from "./SidebarDocumentation";

export default function DocumentationLayout() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid md:grid-cols-7 gap-5 w-full">
        <aside className="hidden md:block">
          <div className="sticky top-[10dvh] h-[90dvh] overflow-y-auto scroll-smooth pr-3 ex-textarea-scroll">
            <SidebarDocumentation />
          </div>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}