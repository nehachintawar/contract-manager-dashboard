import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen ">
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-full overflow-auto w-full">
            <Outlet />
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
