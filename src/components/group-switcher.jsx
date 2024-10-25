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

export function GroupSwitcher({ accessToken }) {
  console.log("rendering group switcher");
  console.log("access 😎", accessToken);

  const [selectedGroup, setSelectedGroup] = useState(null);
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
        .then((data) => setSelectedGroup(data))
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

    console.log("fetching groups x");
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
                src={selectedGroup ? selectedGroup.photoUrl : ""}
                alt="nopic"
                objectFit="cover"
                fallbackSrc="/fallback-group.png"
                boxSize={10}
                borderRadius="full"
              />

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="dark:font-normal font-semibold">Group</span>
                <span className="dark:text-gray-400 mt-2">
                  {selectedGroup ? selectedGroup.name : ""}
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
                    setSelectedGroup(group);
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
