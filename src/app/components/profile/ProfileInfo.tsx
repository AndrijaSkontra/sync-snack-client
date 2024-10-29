"use client";
import {
  Box,
  Button,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { UpdateGroupsSidebarContext } from "../Providers";

export default function ProfileInfo({ userProfileData, session }: any) {
  // how should i handle if userProfile data doesnt have photoUrl?
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(UpdateGroupsSidebarContext);

  const [profilePicture, setProfilePicture] = useState(
    userProfileData?.photoUrl,
  );

  const codeRunList = localStorage.getItem("code-rem")?.split(" ");

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
        if (res.status === 200) {
          const newString = context.updateString + "1";
          context.setUpdateString(newString);
          localStorage.setItem("code-rem", "DontRun --");
        }
      });
    }
  }

  return (
    <>
      <Box className="flex flex-col items-center justify-center space-y-2">
        <Box className="flex space-x-1">
          <Text className="font-semibold">{userProfileData.firstName}</Text>
          <Text className="font-semibold">{userProfileData.lastName}</Text>
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
          src={profilePicture}
          fallbackSrc="/template-user.png"
        />
        <Button colorScheme="xblue" onClick={onOpen}>
          Change Photo
        </Button>
        <EditProfileModal
          onClose={onClose}
          isOpen={isOpen}
          setProfilePicture={setProfilePicture}
          session={session}
        />
      </Box>
    </>
  );
}
