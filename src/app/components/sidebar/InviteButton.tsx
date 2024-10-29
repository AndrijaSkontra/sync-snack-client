"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function InviteButton({ context }: any) {
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

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        {!disable ? (
          <Link onClick={() => handleInvite(setUrl, session, toast)} href="">
            <ClipboardDocumentCheckIcon />
            Send Invite Link
            <p className="text-xs dark:text-gray-600 text-gray-300">
              {context?.selectedGroup ? context.selectedGroup.name : ""}
            </p>
          </Link>
        ) : (
          <Link aria-disabled href="">
            Send Invite Link
            <p className="text-xs dark:text-gray-600 text-gray-300">
              {context?.selectedGroup ? context.selectedGroup.name : ""}
            </p>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function handleInvite(setUrl: any, session: any, toast: any) {
  console.log("trying to get the invitation link");
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
