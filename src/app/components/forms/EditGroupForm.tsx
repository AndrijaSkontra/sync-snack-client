"use client";
import { Box, Image, Input, Button, Spinner, Text, useToast, VStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useCallback, useContext, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UpdateGroupsSidebarContext } from "../Providers";

export default function EditGroupForm({ session, onClose, setReload, initialGroupName, initialGroupDescription }: any) {
  const [groupname, setGroupname] = useState<string>(initialGroupName || "");
  const [groupDescription, setGroupDescription] = useState<string>(initialGroupDescription || "");
  const [groupProfileImage, setGroupProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const updateSidebarContext = useContext(UpdateGroupsSidebarContext);
  const toast = useToast();
  const [isSubmitShown, setIsSubmitShown] = useState(false);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setGroupProfileImage(acceptedFiles[0]);
      // Create preview URL for the dropped image
      const previewUrl = URL.createObjectURL(acceptedFiles[0]);
      setImagePreview(previewUrl);
    }
  }, []);

  useEffect(() => {
    setIsSubmitShown(!!groupname || !!groupDescription || !!groupProfileImage);
  }, [groupname, groupDescription, groupProfileImage]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  // Check if any changes were made
  const hasChanges = groupname !== initialGroupName || 
                    groupDescription !== initialGroupDescription || 
                    groupProfileImage !== null;

  async function handleSubmit(): Promise<void> {
    if (!hasChanges) {
      toast({
        title: "No changes detected",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();

    if (groupname !== initialGroupName) {
      formData.append("name", groupname);
    }
    if (groupDescription !== initialGroupDescription) {
      formData.append("description", groupDescription);
    }
    if (groupProfileImage) {
      formData.append("file", groupProfileImage);
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update group');
      }

      const data = await response.json();
      onClose();
      setReload((prev: number) => prev + 1);
      updateSidebarContext.setUpdateString((prev: string) => prev + "1");
      
      toast({
        title: "Group updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating group:", error);
      toast({
        title: "Failed to update group",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <FormControl>
        <FormLabel>Group Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter group name"
          value={groupname}
          onChange={(e) => setGroupname(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Group Description</FormLabel>
        <Input
          type="text"
          placeholder="Enter group description"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Group Image</FormLabel>
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderStyle="dashed"
          borderRadius="md"
          p={4}
          textAlign="center"
          cursor="pointer"
          onClick={open}
        >
          <input {...getInputProps()} />
          {imagePreview ? (
            <VStack spacing={2}>
              <Image
                src={imagePreview}
                alt="Group image preview"
                boxSize="100px"
                objectFit="cover"
                borderRadius="full"
              />
              <Text fontSize="sm">Click to change image</Text>
            </VStack>
          ) : (
            <Text color="gray.500">Click or drag & drop an image</Text>
          )}
        </Box>
      </FormControl>

      {isSubmitShown && (
        <Box className="mt-4 flex justify-center">
          {loading ? (
            <Spinner />
          ) : (
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Box>
      )}
    </VStack>
  );
}