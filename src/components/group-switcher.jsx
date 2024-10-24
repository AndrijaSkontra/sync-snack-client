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

export function GroupSwitcher() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    function fetchCurrentGroup() {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/66d5a7ca1c7c7255cb87aacb`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => setSelectedGroup(data))
        .catch((e) => console.log("error!", e.message));
    }

    if (status === "authenticated") {
      fetchCurrentGroup();
    }
  }, [status]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setUserGroups(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (status === "authenticated") {
      fetchGroups();
    }
  }, [status]);

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
                    console.log("selected group", group);
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
