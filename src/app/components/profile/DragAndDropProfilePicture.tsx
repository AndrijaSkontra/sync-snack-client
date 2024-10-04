"use client";

import { useState } from "react";
import {
  Input,
  Button,
  VStack,
  Text,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { DownloadIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

/**
 * Gpt generated file, good luck
 */
export default function DragAndDropProfilePicture({
  setProfilePicture,
  onClose,
}: any) {
  const { data: session, status: sessionStatus }: any = useSession();
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => handleFileUpload(files),
  });

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) {
      setUploadStatus("No file selected.");
      return;
    }

    if (sessionStatus === "loading") {
      setUploadStatus("Session is loading...");
      return;
    }

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        console.log("does this exe");
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profiles/edit`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            // "Content-Type": "multipart/form-data"
          },
          body: formData,
        })
          .then((response) => {
            setUploadStatus("File uploaded successfully!");
            return response.json();
          })
          .then((data) => {
            setProfilePicture(data.photoUrl);
            setLoading(false);
            onClose();
          })
          .catch(() => {
            setUploadStatus("File upload failed.");
            setErrorDetails(`Error`);
            onClose();
            setLoading(false);
            toast({
              title: "Failed to update profile picture",
              status: "error",
              duration: 3000,
              isClosable: true,
              colorScheme: "xred",
              position: "top",
            });
          });
      } catch (error: any) {
        console.error("Error uploading file:", error); // Log error details
        setUploadStatus("An error occurred while uploading the file.");
        setErrorDetails(`custom er:${error.message}`);
        setLoading(false);
        onClose();
        toast({
          title: "Failed to update profile picture",
          status: "error",
          duration: 3000,
          isClosable: true,
          colorScheme: "xred",
          position: "top",
        });
      }
    }
  };

  const tryParseJSON = async (response: Response) => {
    try {
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  };

  return (
    <VStack spacing={4} align="center">
      {!loading && (
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderRadius="md"
          borderColor="gray.200"
          p={4}
          textAlign="center"
          width="100%"
          maxWidth="400px"
        >
          <input {...getInputProps()} />
          <Text>Upload Image</Text>
          <DownloadIcon />
        </Box>
      )}
      {errorDetails && <Text color="red.500">{errorDetails}</Text>}
      {loading && <Spinner />}
    </VStack>
  );
}
