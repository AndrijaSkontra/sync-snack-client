"use client";

import {
  CommandLineIcon,
  CalendarIcon,
  CakeIcon,
  UserGroupIcon,
  PlusCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IsMyEventVisibleContext } from "@/app/components/Providers";

/**
 * Component that will show all the navigation links.
 * Hook useMyEventVisible is a fetch to check does the user have an active event.
 * IsMyEventVisibleContext is important if we need to update is the My Event link visible.
 */
export default function SidebarLinks() {
  const isMyEventVisibleContext = useContext(IsMyEventVisibleContext);
  useMyEventVisible(isMyEventVisibleContext);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Group Details</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <LinkItem
              title="Events"
              url="group-events"
              icon={<CalendarIcon />}
            />
            <LinkItem title="Orders" url="orders" icon={<CommandLineIcon />} />
            {isMyEventVisibleContext.isMyEventVisible && (
              <LinkItem title="My Event" url="event" icon={<CakeIcon />} />
            )}
            <LinkItem
              title="Information"
              url="group"
              icon={<UserGroupIcon />}
            />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroupLabel>Group Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <LinkItem
              title="Join Group"
              url="#"
              icon={<ArrowRightCircleIcon />}
            />
            <LinkItem title="Create Group" url="#" icon={<PlusCircleIcon />} />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

function LinkItem({ title, icon, url }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={url}>
          {icon}
          {title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function useMyEventVisible(isMyEventVisibleContext) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            isMyEventVisibleContext.setIsMyEventVisible(true);
          }
        })
        .catch((e) => console.log("no my event"));
    }
  }, [session, status]);
}
