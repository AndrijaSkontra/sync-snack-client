"use client";

import SignOutMenuItem from "./sign-out-menu-item.jsx";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect } from "react";
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
import { useContext } from "react";
import { UserProfilePictureContext } from "@/app/components/Providers";

export function ProfileSettings({ session }) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const context = useContext(UserProfilePictureContext);

  // Update the 'dark' class on the <html> element whenever colorMode changes
  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode]);

  context.setUserProfilePicture(session?.user.profileUri);

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
                  src={context.userProfilePicture}
                  className="h-10 w-10 rounded-full border-2 border-black object-cover dark:border-gray-300"
                />
                <AvatarFallback>
                  {session?.user && session.user.firstName.slice(0, 1)}
                  {session?.user && session.user.lastName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none ml-2">
                <span className="dark:font-normal font-semibold">
                  {session?.user && session.user.firstName}
                  &nbsp;
                  {session?.user && session.user.lastName}
                </span>
                <span className="dark:text-gray-400 mt-2">
                  {session?.user && session.user.email.split("@")[0]}
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
              }}
            >
              {colorMode === "dark" ? (
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
