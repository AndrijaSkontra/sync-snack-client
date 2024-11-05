"use client";
import { Box, Button, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { UpdateGroupsSidebarContext } from "../Providers";

export default function ProfileInfo({ userProfileData, session }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(UpdateGroupsSidebarContext);
  const toast = useToast();

  const [profilePicture, setProfilePicture] = useState(userProfileData?.photoUrl);
  const [firstName, setFirstName] = useState(userProfileData?.firstName || "");
  const [lastName, setLastName] = useState(userProfileData?.lastName || "");
  

  useEffect(() => {
    let codeRunList = localStorage.getItem("code-rem")?.split(" ");
 
    if (codeRunList) {
      if (codeRunList[0] === "Run") {
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/joinViaInvitation/${codeRunList[1]}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          },
        ).then((res) => {
          console.log("Response: ", res);
          if (res.status === 200) {
            const newString = context.updateString + "1";
            context.setUpdateString(newString);
            localStorage.setItem("code-rem", "DontRun --");

            // Show success toast
            toast({
              title: "Joined group successfully",
              description: "You have successfully joined the group.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else if(res.status === 404) {
            // Show error toast
            toast({
              title: "Failed to join group",
              description: "Link is invalid ",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          } else if(res.status === 400) {
            toast({
              title: "Failed to join group",
              description: "You are already member of this group",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Failed to join group",
              description: "There was an issue joining the group. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
      }
    }
    localStorage.removeItem('code-rem')
  })
  

  return (
    <Box className="flex flex-col items-center space-y-2">
      <Box className="flex space-x-1">
        <Text fontWeight="semibold">{firstName}</Text>
        <Text fontWeight="semibold">{lastName}</Text>
      </Box>
      <Image
        objectFit="cover"
        rounded="full"
        boxSize={44}
        borderRadius="full"
        border="solid"
        alt="no-pic"
        borderColor="xblue.400"
        borderWidth={3}
        src={profilePicture || "/template-user.png"}
      />
      <Button colorScheme="xblue" onClick={onOpen}>Edit Profile</Button>
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        setProfilePicture={setProfilePicture}
        setFirstName={setFirstName}
        setLastName={setLastName}
        session={session}
      />
    </Box>
  );
}
