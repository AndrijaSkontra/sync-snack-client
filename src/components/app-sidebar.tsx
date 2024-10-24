import * as React from "react";

import { GroupSwitcher } from "./group-switcher";
import { ProfileSettings } from "./profile-settings.jsx";
import {
  CommandLineIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Group Details",
      url: "#",
      items: [
        {
          title: "Events",
          icon: <CommandLineIcon />,
          url: "/group-events",
        },
        {
          title: "Orders",
          icon: <CalendarIcon />,
          url: "/orders",
        },
        {
          title: "Information",
          icon: <CalendarIcon />,
          url: "/group",
        },
        {
          title: "Your Event",
          icon: <CommandLineIcon />,
          url: "/event",
        },
      ],
    },
    {
      title: "Group Management",
      url: "#",
      items: [
        {
          title: "Create Group",
          icon: <CommandLineIcon />,
          url: "#",
        },
        {
          title: "Join Group",
          icon: <CalendarIcon />,
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <GroupSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <ProfileSettings />
      </SidebarFooter>
    </Sidebar>
  );
}
