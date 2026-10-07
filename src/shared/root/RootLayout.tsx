import { Outlet } from "react-router-dom";
import RootHeader from "../root/RootHeader";

export default function RootLayout() {
  return (
    <div className="min-h-dvh relative text-foreground bg-background">
      {/* CONTENT */}
      <div className="mx-auto">
        <RootHeader />
        <main className="px-10 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
