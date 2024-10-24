import * as React from "react";

import { ProfileSettings } from "./profile-settings.jsx";
import { VersionSwitcher } from "@/components/version-switcher";
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

const data = {
  groups: ["Kodelab", "Coin", "Rimac"],
  navMain: [
    {
      title: "Actions",
      url: "#",
      items: [
        {
          title: "Event",
          icon: <CommandLineIcon />,
          url: "/event",
        },
        {
          title: "Start Events",
          icon: <CalendarIcon />,
          url: "#",
        },
      ],
    },
    {
      title: "Admin Actions",
      url: "#",
      items: [
        {
          title: "All Users",
          icon: <UserGroupIcon />,
          url: "#",
        },
        {
          title: "List Orders",
          icon: <CommandLineIcon />,
          url: "#",
        },
        {
          title: "Show Events",
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
        <VersionSwitcher
          versions={data.groups}
          defaultVersion={data.groups[0]}
        />
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
                      <a href={item.url}>
                        {item.icon}
                        {item.title}
                      </a>
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
