"use client";
import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function InviteButton() {
  const { data: session, status }: any = useSession();
  const [url, setUrl] = useState("...");
  const toast = useToast();

  return (
    <Button
      className="w-full"
      onClick={() => handleInvite(setUrl, session, toast)}
    >
      Invite
    </Button>
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
      console.log("data in the invite button", data);
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
          `http://localhost:3000/join?code=${code}`,
        );
      }
    })
    .catch((e) => console.log(e));
}
