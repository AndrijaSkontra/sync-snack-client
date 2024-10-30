"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function InviteButton({ context }: any) {
  const t = useTranslations("Sidebar");
  const { data: session, _ }: any = useSession();
  const [url, setUrl] = useState("...");
  const toast = useToast();
  let disable = false;
  if (
    context?.selectedGroup === null ||
    context?.selectedGroup?.name === "Select Group"
  ) {
    disable = true;
  }

  let groupName: string = context?.selectedGroup?.name;
  if (groupName) {
    if (groupName.length > 8) {
      groupName = groupName.slice(0, 8) + "...";
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        {!disable ? (
          <Link onClick={() => handleInvite(setUrl, session, toast)} href="">
            <ClipboardDocumentCheckIcon className="dark:stroke-2 stroke-[#234089] dark:stroke-[#5978bc]" />
            {t("Send Invite Link")}
            <p className="text-xs dark:text-gray-600 text-gray-300">
              {context?.selectedGroup ? groupName : ""}
            </p>
          </Link>
        ) : (
          <Link aria-disabled href="">
            Send Invite Link
            <p className="text-xs dark:text-gray-600 text-gray-300">
              {context?.selectedGroup ? groupName : ""}
            </p>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function handleInvite(setUrl: any, session: any, toast: any) {
  fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/sendInvitation?invitedBy=${session.user.userProfileId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
        groupId: `${localStorage.getItem("GroupId")}`,
      },
    },
  )
    .then((res) => {
      if (res.status === 429) {
        toast({
          title: "Too many requests",
          description: "Please try again later.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return null;
      }
      return res.text();
    })
    .then((data: any) => {
      if (data) {
        setUrl(data);
        toast({
          title: "Invitation sent!",
          description: "Your invitation link is ready to be shared.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        const lista = data.split("/");
        const code = lista[lista.length - 1];
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_DOMAIN}/join?code=${code}`,
        );
      }
    })
    .catch((e) => console.log(e));
}
