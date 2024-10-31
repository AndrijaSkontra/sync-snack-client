"use client";
import { Box, Button, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { UpdateGroupsSidebarContext } from "../Providers";

export default function ProfileInfo({ userProfileData, session }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(UpdateGroupsSidebarContext);
  const toast = useToast();

  const [profilePicture, setProfilePicture] = useState(userProfileData?.photoUrl);
  const [firstName, setFirstName] = useState(userProfileData?.firstName || "");
  const [lastName, setLastName] = useState(userProfileData?.lastName || "");

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
