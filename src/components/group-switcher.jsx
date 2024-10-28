"use client";

import * as React from "react";
import { ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SelectedGroupContext } from "@/app/components/Providers";

export function GroupSwitcher({ accessToken }) {
  const router = useRouter();

  const selectedGroupContext = useContext(SelectedGroupContext);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    function fetchCurrentGroup() {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/${localStorage.getItem("GroupId")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => selectedGroupContext.setSelectedGroup(data))
        .catch((e) => console.log("error!", e.message));
    }

    fetchCurrentGroup();
  }, []);

  useEffect(() => {
    function fetchGroups() {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserGroups(data);
        })
        .catch(() => console.log(err.message, "-> failed to fetch groups ❌"));
    }

    fetchGroups();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Image
                src={
                  selectedGroupContext.selectedGroup
                    ? selectedGroupContext.selectedGroup.photoUrl
                    : ""
                }
                alt="nopic"
                objectFit="cover"
                fallbackSrc="/fallback-group.png"
                boxSize={10}
                borderRadius="full"
              />

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="dark:font-normal font-semibold">Group</span>
                <span className="mt-1">
                  <p className="text-[#15408c] dark:text-[#5078bf]">
                    {selectedGroupContext.selectedGroup
                      ? selectedGroupContext.selectedGroup.name
                      : ""}
                  </p>
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {userGroups.map((group, index) => {
              return (
                <DropdownMenuItem
                  key={group.groupId}
                  onSelect={() => {
                    selectedGroupContext.setSelectedGroup(group);
                    localStorage.setItem("GroupId", group.groupId);
                    router.push("/group");
                    router.refresh();
                  }}
                >
                  <div className="flex space-x-1 items-center">
                    <Image
                      src={group.photoUrl}
                      alt="nopic"
                      objectFit="cover"
                      fallbackSrc="/fallback-group.png"
                      boxSize={10}
                      borderRadius="full"
                    />
                    &nbsp;
                    {group.name}
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
