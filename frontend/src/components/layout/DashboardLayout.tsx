import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Fixed sidebar, lg+ only */}
      <Sidebar />

      {/* Content shifts right of the sidebar on lg+ */}
      <div className="lg:pl-[248px]">
        <Topbar />

        {/* pb-24 on mobile clears the bottom nav */}
        <main className="mx-auto max-w-[1280px] px-6 pt-8 pb-28 lg:px-10 lg:pt-8 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav, < lg only */}
      <MobileNav />
    </div>
  );
}