"use client";
import { Box, Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UpdateGroupsSidebarContext } from "../Providers";

export default function EditGroupForm({ session, onClose, setReload }: any) {
  const [isSubmitButtonShown, setIsSubmitButtonShown] = useState(false);
  const [groupProfileImage, setGroupProfileImage]: any = useState();
  const [loading, setLoading] = useState(false);
  const updateSidebarContext = useContext(UpdateGroupsSidebarContext);
  const toast = useToast();
  const onDrop = useCallback((acceptedFiles: any) => {
    setIsSubmitButtonShown(true);
    setGroupProfileImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function handleClick(): void {
    const formData = new FormData();

    formData.append("file", groupProfileImage);

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        groupId: `${localStorage.getItem("GroupId")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();
        setReload((prev: any) => prev + "1");
        setLoading(false);
        updateSidebarContext.setUpdateString((prev: any) => prev + "1");
        toast({
          title: "Group image uploaded successfully!",
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

  return (
    <div className="flex flex-col h-full">
      <Text className="font-semibold text-gray-400 mb-2">
        Upload Group Image
      </Text>
      <div
        className="border-dashed border p-10 rounded-xl dark:bg-red-200 bg-gray-600"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : !groupProfileImage ? (
          <p className="font-semibold text-gray-300 flex justify-center">
            Drag &apos;n&apos; drop image
          </p>
        ) : (
          <p className="font-semibold text-gray-300 flex justify-center">
            Image selected
          </p>
        )}
      </div>
      {isSubmitButtonShown && (
        <Box className="my-4 flex justify-center">
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
