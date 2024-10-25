import * as React from "react";

import SidebarLinks from "@/components/sidebar-links.jsx";
import { GroupSwitcher } from "./group-switcher";
import { ProfileSettings } from "./profile-settings.jsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({ accessToken, ...props }: any) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <GroupSwitcher accessToken={accessToken} /> {/* Change current group */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarLinks /> {/* Navigation links */}
      </SidebarContent>
      <SidebarFooter>
        <ProfileSettings /> {/* Profile options like sign out */}
      </SidebarFooter>
    </Sidebar>
  );
}
