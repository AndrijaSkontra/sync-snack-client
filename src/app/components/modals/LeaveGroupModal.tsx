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

export default function LeaveGroupModal({ isOpen, onClose }: any) {
  const { data: session, status }: any = useSession();
  const toast = useToast();
  const router = useRouter();

  function leaveGroup() {
    console.log("😥 data");
    console.log(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/kick?userProfileId=${session?.user.userProfileId} === link`,
    );
    console.log(`Bearer ${session?.user.accessToken} === access token`);
    console.log(`${localStorage.getItem("GroupId")} === group id`);
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
        localStorage.setItem("GroupId", "");
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
            <Button onClick={leaveGroup} colorScheme="xred" variant={"surface"}>
              Yes
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
