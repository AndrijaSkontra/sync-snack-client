import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SelectedGroupContext, UserGroupContext } from "../Providers";
import { setGroupIdServer } from "@/components/group-switcher";

export default function LeaveGroupModal({ isOpen, onClose, session }: any) {
  const toast = useToast();
  const router = useRouter();
  const selectedGroupContext = useContext(SelectedGroupContext);
  const userGroupContext = useContext(UserGroupContext);

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
          onClose();
          const groupIdToRemove = localStorage.getItem("GroupId");
          const newGroups = userGroupContext.userGroups.filter(
            (group: any) => group.groupId !== groupIdToRemove,
          );
          userGroupContext.setUserGroups(newGroups);
          localStorage.setItem("GroupId", "");
          setGroupIdServer("");
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
          onClose();
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
      onClose();
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="py-4 px-10">
        <ModalHeader>Leave group</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col">
          <Text>Are your sure you want to leave this group?</Text>
          <Box className="flex space-x-4 w-full justify-center mt-4">
            <Button onClick={onClose}>No</Button>
            <Button onClick={leaveGroup} colorScheme="xred">
              Yes
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
