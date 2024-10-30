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
import LeaveGroupModal from "@/app/components/modals/LeaveGroupModal";
import InviteButton from "@/app/components/sidebar/InviteButton";
import { useTranslations } from "next-intl";

/**
 * Component that will show all the navigation links.
 * Hook useMyEventVisible is a fetch to check does the user have an active event.
 * IsMyEventVisibleContext is important if we need to update is the My Event link visible.
 */
export default function SidebarLinks({ session }) {
  const t = useTranslations("Sidebar");

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

  const {
    isOpen: isLeaveModalOpen,
    onOpen: onLeaveModalOpen,
    onClose: onLeaveModalClose,
  } = useDisclosure();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Group Details</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <LinkItem
              title={t("Events")}
              url="group-events"
              context={selectedGroupContext}
              icon={
                <CalendarIcon className="dark:stroke-2 stroke-[#234089] dark:stroke-[#5978bc]" />
              }
            />
            <LinkItem
              title={t("Orders")}
              context={selectedGroupContext}
              url="orders"
              icon={
                <CommandLineIcon className="dark:stroke-2 stroke-[#234089] dark:stroke-[#5978bc]" />
              }
            />
            {isMyEventVisibleContext.isMyEventVisible && (
              <LinkItem
                title={t("My Event")}
                context={selectedGroupContext}
                url="event"
                icon={
                  <CakeIcon className="dark:stroke-2 stroke-[#234089] dark:stroke-[#5978bc]" />
                }
              />
            )}
            <LinkItem
              title={t("Information")}
              context={selectedGroupContext}
              url="group"
              icon={
                <UserGroupIcon className="dark:stroke-2 stroke-[#234089] dark:stroke-[#5978bc]" />
              }
            />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroupLabel>Group Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <div onClick={onGroupModalOpen}>
              <LinkItem
                title={t("New Group")}
                context={selectedGroupContext}
                url="#"
                icon={
                  <PlusCircleIcon className="dark:stroke-2 stroke-[#234089] dark:stroke-[#5978bc]" />
                }
              />
            </div>
            <div onClick={onLeaveModalOpen}>
              <LinkItem
                title={t("Leave Group")}
                context={selectedGroupContext}
                url="#"
                icon={
                  <ArrowLeftCircleIcon className="dark:stroke-2 stroke-[#234089] dark:stroke-[#5978bc]" />
                }
              />
            </div>
            <InviteButton context={selectedGroupContext} />
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
      <LeaveGroupModal
        isOpen={isLeaveModalOpen}
        onClose={onLeaveModalClose}
        session={session}
      />
    </>
  );
}

function LinkItem({ title, icon, url, context }) {
  let disable = false;
  if (
    context?.selectedGroup === null ||
    context?.selectedGroup?.name === "Select Group"
  ) {
    disable = true;
  }

  let groupName = context?.selectedGroup?.name;
  if (groupName) {
    if (groupName.length > 8) {
      groupName = groupName.slice(0, 8) + "...";
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        {!disable ? (
          <Link href={url}>
            {icon}
            {title}
          </Link>
        ) : (
          <Link aria-disabled href={url}>
            {icon}
            {title}
          </Link>
        )}
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
