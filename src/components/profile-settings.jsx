"use client";

import SignOutMenuItem from "./sign-out-menu-item.jsx";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation.js";

export function ProfileSettings() {
  //  TODO: this should be context visible in server components as well
  const [dark, setDark] = useState(true);
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  function darkModeHandler() {
    if (localStorage.getItem("chakra-ui-color-mode")) {
      if (localStorage.getItem("chakra-ui-color-mode") === "dark") {
        document.documentElement.classList.add("dark");
        setDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setDark(false);
      }
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar>
                <AvatarImage
                  src="/template-user.png"
                  className="h-10 w-10 rounded-full border-2 border-black object-cover dark:border-gray-300"
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="dark:font-normal font-semibold">
                  Mate Budimir
                </span>
                <span className="dark:text-gray-400 mt-2">
                  mbudimir@gmail.com
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            <DropdownMenuItem
              onSelect={() => {
                toggleColorMode();
                darkModeHandler();
              }}
            >
              {dark ? (
                <div className="flex items-center space-x-2">
                  <p>Light mode</p>
                  <SunIcon />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p>Dark mode</p>
                  <MoonIcon />
                </div>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => router.push("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutMenuItem />
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
