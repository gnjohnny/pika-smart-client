import {
  CookingPot,
  FilePlus,
  LayoutDashboard,
  Star,
  Trash,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useLocation } from "react-router";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create",
    url: "/dashboard/create",
    icon: FilePlus,
  },
  {
    title: "Recipes",
    url: "/dashboard/recipes",
    icon: CookingPot,
  },
  {
    title: "Favourites",
    url: "/dashboard/favourites",
    icon: Star,
  },
  {
    title: "Trashed",
    url: "/dashboard/trashed",
    icon: Trash,
  },
];

export function AppSidebar() {
  const location = useLocation();

  const pathname = location.pathname;
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full flex justify-center items-center">
          <img
            src={"/pika-smart-logo.svg"}
            alt="pika smart brand logo"
            width={150}
            height={50}
          />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="p-2 space-y-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`${pathname === item.url ? "px-2 py-6 shadow-sm shadow-primary/10 rounded-md border-l-4 border-l-primary/60" : ""}`}
              >
                <Link to={item.url}>
                  <item.icon className="size-12" />
                  <span className="font-semibold">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
