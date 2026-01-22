import {
  CookingPot,
  EllipsisVertical,
  FilePlus,
  LayoutDashboard,
  LogOutIcon,
  SettingsIcon,
  Star,
  Trash,
  UserIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth, useSignOut } from "@/hooks/auth.hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import { extractNameFromEmail } from "@/helpers/helpers";

// Menu items.
const items: ItemsLinkType[] = [
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

  const { authUser } = useAuth();
  const { reset, signOut } = useSignOut();

  const handleSignOut = async () => {
    reset();
    try {
      const res = await signOut();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
      <SidebarFooter>
        <div className="w-full p-1 border border-primary/30 shadow-sm shadow-primary/40 rounded-md flex items-center relative">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="font-bold text-xl">
              {extractNameFromEmail(authUser?.user.email).slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-start flex-col mx-2">
            <p className="text-xl text-primary/90 font-bold">
              {extractNameFromEmail(authUser?.user.email)}
            </p>
            <p className="text-xs text-primary/80">{authUser?.user.email}</p>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-r-md h-full flex justify-center items-center cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open user menu"
                  className="p-1"
                >
                  <EllipsisVertical />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
