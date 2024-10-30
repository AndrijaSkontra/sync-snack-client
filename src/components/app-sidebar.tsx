import * as React from "react";

import SidebarLinks from "@/components/sidebar-links.jsx";
import { GroupSwitcher } from "./group-switcher";
import { ProfileSettings } from "./profile-settings.jsx";
import LanguageSwitcher from "./language-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { auth } from "@/commons/auth";

export async function AppSidebar({ accessToken, ...props }: any) {
  const session = await auth();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <GroupSwitcher accessToken={accessToken} /> {/* Change current group */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarLinks session={session} /> {/* Navigation links */}
      </SidebarContent>
      <SidebarFooter>
        {/* Profile options like sign out */}
        <LanguageSwitcher />
        <ProfileSettings session={session} />{" "}
      </SidebarFooter>
    </Sidebar>
  );
}
