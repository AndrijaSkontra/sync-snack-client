"use client";

import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function EditProfileForm({
  onClose,
  session,
  setProfilePicture,
}: any) {
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage]: any = useState();
  const [profileImageURL, setProfileImageURL] = useState<string | null>(null);
  const [isSubmitShown, setIsSubmitShown] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setProfileImage(file);
    setProfileImageURL(URL.createObjectURL(file));
    setIsSubmitShown(true);
  }, []);

  const toast = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function handleClick(): void {
    const formData = new FormData();

    formData.append("file", profileImage);

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        // "Content-Type": "multipart/form-data"
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();
        setProfilePicture(profileImageURL);
        setLoading(false);
        toast({
          title: "Profile image uploaded successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error when uploading group image:", error);
      });
  }

  useEffect(() => {
    return () => {
      if (profileImageURL) {
        URL.revokeObjectURL(profileImageURL);
      }
    };
  }, [profileImageURL]);

  return (
    <div className="flex flex-col h-full">
      <div
        className="border-dashed border p-10 rounded-xl "
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : !profileImage ? (
          <p className="font-semibold text-gray-300 flex justify-center">
            Drag &apos;n&apos; drop image
          </p>
        ) : (
          <p className="font-semibold text-gray-300 flex justify-center">
            Image selected
          </p>
        )}
      </div>
      {isSubmitShown && (
        <Box className="mt-4 flex justify-center">
          {loading ? (
            <Spinner />
          ) : (
            <Button onClick={handleClick}>Submit</Button>
          )}
        </Box>
      )}
    </div>
  );
}
