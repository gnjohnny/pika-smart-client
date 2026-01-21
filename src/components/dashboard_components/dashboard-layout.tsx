import React from "react";
import { useLocation } from "react-router";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

type DashBoardLayoutProps = {
  children: React.ReactNode;
};
const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  const location = useLocation();
  const pathname = location.pathname.split("/").filter(Boolean);
  const title =
    pathname[pathname.length - 1]
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()) || "Dashboard";
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1">
          <header className="h-14 flex items-center px-2 border-b">
            <div className="p-2">
              <SidebarTrigger />
            </div>
            <Separator orientation="vertical" className="h-4" />
            <h1 className="text-primary/80 font-bold mx-2" aria-live="polite">
              {title}
            </h1>
          </header>

          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
