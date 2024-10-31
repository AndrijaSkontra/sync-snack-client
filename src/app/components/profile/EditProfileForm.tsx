"use client";

import {
  Box,
  Button,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UserProfilePictureContext } from "../Providers";

export default function EditProfileForm({
  onClose,
  session,
  setProfilePicture,
  setFirstName,
  setLastName,
}: any) {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [firstName, setFname] = useState<string>("");
  const [lastName, setLName] = useState<string>("");
  const [profileImageURL, setProfileImageURL] = useState<string | null>(null);
  const [isSubmitShown, setIsSubmitShown] = useState(false);
  const context = useContext(UserProfilePictureContext);

  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setProfileImage(file);
    setProfileImageURL(URL.createObjectURL(file));
    setIsSubmitShown(true);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true, // Prevents default file browser on zone click
  });

  const handleClick = (): void => {
    if (!firstName && !lastName && !profileImage) {
      toast({
        title: "Please update at least one field.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    if (firstName) formData.append("firstName", firstName);
    if (lastName) formData.append("lastName", lastName);
    if (profileImage) formData.append("file", profileImage);
    const url: any = profileImageURL?.split(":");
    console.log(url[1] + url[2] + url[3], "😎");

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();
        const url: any = profileImageURL?.split(":");
        context.setUserProfilePicture(url[1] + url[2] + url[3]);
        if (profileImageURL) setProfilePicture(profileImageURL);
        if (firstName) setFirstName(firstName);
        if (lastName) setLastName(lastName);
        setLoading(false);
        toast({
          title: "Profile updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error when updating profile:", error);
      });
  };

  useEffect(() => {
    setIsSubmitShown(!!firstName || !!lastName || !!profileImage);
  }, [firstName, lastName, profileImage]);

  useEffect(() => {
    return () => {
      if (profileImageURL) {
        URL.revokeObjectURL(profileImageURL);
      }
    };
  }, [profileImageURL]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <Box>
        <Text>First name:</Text>
        <Input
          type="text"
          placeholder="Enter your new first name"
          value={firstName}
          onChange={(e) => setFname(e.target.value)}
        />
      </Box>
      <Box>
        <Text>Last Name:</Text>
        <Input
          type="text"
          placeholder="Enter your new last name"
          value={lastName}
          onChange={(e) => setLName(e.target.value)}
        />
      </Box>

      <Box
        {...getRootProps()}
        className="border-dashed border p-4 rounded-lg flex flex-col items-center justify-center space-y-2 cursor-pointer"
        onClick={open}
      >
        <input {...getInputProps()} />
        {profileImageURL ? (
          <Image
            src={profileImageURL}
            alt="Selected profile preview"
            boxSize="100px"
            objectFit="cover"
            borderRadius="full"
          />
        ) : (
          <Text color="gray.500">Click or drag & drop an image</Text>
        )}
      </Box>

      {isSubmitShown && (
        <Box className="mt-4 flex justify-center">
          {loading ? (
            <Spinner />
          ) : (
            <Button colorScheme="blue" onClick={handleClick}>
              Submit
            </Button>
          )}
        </Box>
      )}
    </div>
  );
}
