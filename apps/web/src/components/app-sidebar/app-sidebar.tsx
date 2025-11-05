import {
  Calendar,
  Home,
  Search,
  Settings,
  CreditCardIcon,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { UserMenu } from "./user-menu";
import { useQuery } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/queries";

// Menu items.
const items = [
  {
    title: "Home",
    to: "/",
    icon: Home,
  },
  {
    title: "Accounts",
    to: "#",
    icon: CreditCardIcon,
  },
  {
    title: "Calendar",
    to: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    to: "#",
    icon: Search,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
  },
] satisfies { title: string; to: string; icon: LucideIcon }[];

export function AppSidebar() {
  const { data: session } = useQuery(sessionQueryOptions);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {session?.data?.user && (
          <UserMenu
            user={{
              name: session.data.user.name,
              email: session.data.user.email,
              avatar: session.data.user.image ?? "",
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
