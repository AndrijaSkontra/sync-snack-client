"use client";

import {
  CommandLineIcon,
  CalendarIcon,
  CakeIcon,
  UserGroupIcon,
  PlusCircleIcon,
  ArrowLeftCircleIcon,
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
import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  IsMyEventVisibleContext,
  SelectedGroupContext,
} from "@/app/components/Providers";
import { useDisclosure } from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { handleGroupCreate } from "@/app/server-actions/create-group";
import { handleGroupJoin } from "@/app/server-actions/group-join";
import JoinCreateGroupModal from "@/app/components/modals/JoinCreateGroupModal";

/**
 * Component that will show all the navigation links.
 * Hook useMyEventVisible is a fetch to check does the user have an active event.
 * IsMyEventVisibleContext is important if we need to update is the My Event link visible.
 */
export default function SidebarLinks() {
  const isMyEventVisibleContext = useContext(IsMyEventVisibleContext);
  useMyEventVisible(isMyEventVisibleContext);

  const selectedGroupContext = useContext(SelectedGroupContext);
  const [state, formAction] = useFormState(handleGroupCreate, {
    message: null,
    errors: null,
  });
  const [joinState, joinFormAction] = useFormState(handleGroupJoin, {
    message: null,
    errors: null,
  });

  const {
    isOpen: isGroupModalOpen,
    onOpen: onGroupModalOpen,
    onClose: onGroupModalClose,
  } = useDisclosure();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Group Details</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <LinkItem
              title={"Events"}
              context={selectedGroupContext}
              url="group-events"
              icon={<CalendarIcon />}
            />
            <LinkItem
              title="Orders"
              context={selectedGroupContext}
              url="orders"
              icon={<CommandLineIcon />}
            />
            {isMyEventVisibleContext.isMyEventVisible && (
              <LinkItem
                context={selectedGroupContext}
                title="My Event"
                url="event"
                icon={<CakeIcon />}
              />
            )}
            <LinkItem
              context={selectedGroupContext}
              title="Information"
              url="group"
              icon={<UserGroupIcon />}
            />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroupLabel>Group Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <div onClick={onGroupModalOpen}>
              <LinkItem title="New Group" url="#" icon={<PlusCircleIcon />} />
            </div>
            <LinkItem
              title="Leave Group"
              url="#"
              icon={<ArrowLeftCircleIcon />}
            />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <JoinCreateGroupModal
        state={state}
        formAction={formAction}
        joinState={joinState}
        joinFormAction={joinFormAction}
        isOpen={isGroupModalOpen}
        onClose={onGroupModalClose}
      />
    </>
  );
}

function LinkItem({ title, icon, url, context }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={url}>
          {icon}
          {title}
          <p className="text-xs dark:text-gray-600 text-gray-300">
            {context?.selectedGroup ? context.selectedGroup.name : ""}
          </p>
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
