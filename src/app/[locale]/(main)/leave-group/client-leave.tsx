"use client";

import { Text, Button } from "@chakra-ui/react";
import {
  SelectedGroupContext,
  UserGroupContext,
} from "@/app/components/Providers";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function ClientLeave({ session }: any) {
  const toast = useToast();
  const selectedGroupContext = useContext(SelectedGroupContext);
  const userGroupContext = useContext(UserGroupContext);
  const router = useRouter();

  function leaveGroup() {
    if (
      !(
        localStorage.getItem("GroupId") === null ||
        localStorage.getItem("GroupId") === ""
      )
    ) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/leaveGroup`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          toast({
            title: "Left Group",
            description: "Group left success.",
            status: "success",
            duration: 3000,
            isClosable: true,
            colorScheme: "xblue",
          });
          const groupIdToRemove = localStorage.getItem("GroupId");
          const newGroups = userGroupContext.userGroups.filter(
            (group: any) => group.groupId !== groupIdToRemove,
          );
          userGroupContext.setUserGroups(newGroups);
          localStorage.setItem("GroupId", "");
          selectedGroupContext.setSelectedGroup({ name: "Select Group" });
          router.push("/profile");
        } else {
          toast({
            title: "Fail",
            description: "Failed leaving group.",
            status: "error",
            duration: 3000,
            isClosable: true,
            colorScheme: "xred",
          });
        }
      });
    } else {
      toast({
        title: "Fail",
        description: "Group is not defined.",
        status: "error",
        duration: 3000,
        isClosable: true,
        colorScheme: "xred",
      });
    }
  }
  return (
    <div className="flex flex-col space-y-2 items-center">
      <Text>Are you sure you want to leave this group?</Text>
      <Button onClick={leaveGroup}>Yes</Button>
    </div>
  );
}
