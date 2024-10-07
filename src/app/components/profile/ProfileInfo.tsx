"use client";
import { Box, Button, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileInfo({ userProfileData, session }: any) {
  // how should i handle if userProfile data doesnt have photoUrl?
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profilePicture, setProfilePicture] = useState(
    userProfileData?.photoUrl,
  );

  return (
    <>
      <Box className="flex flex-col justify-center items-center space-y-2">
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
