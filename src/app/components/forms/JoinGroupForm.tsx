import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  ChakraProvider,
  Input,
  Button,
  Box,
  useToast,
  Spinner,
} from "@chakra-ui/react";

export default function JoinGroupForm({
  onClose,
  joinState,
  joinFormAction,
}: any) {
  const toast = useToast();

  useEffect(() => {
    if (joinState && joinState.message === "Group joined") {
      joinState.message = "";
      onClose();
      toast({
        title: "Group Joined",
        description: "You've successfully joined a group",
        status: "success",
        duration: 2000,
        isClosable: true,
        colorScheme: "green",
      });
    }
  }, [joinState]);

  return (
    <Box className="flex justify-center">
      <form action={joinFormAction} className="rounded-lg w-full max-w-md">
        <Box className="space-y-4">
          <Input
            name="groupName"
            placeholder="Group Name"
            size="md"
            focusBorderColor="xblue.500"
          />
          <Input
            name="groupPassword"
            type="password"
            placeholder="Group Password"
            size="md"
            focusBorderColor="xblue.500"
          />
          <Box className="flex justify-center">
            <SubmitButton />
          </Box>
        </Box>
        {joinState.message && (
          <p className="mt-4 text-red-500">{joinState.message}</p>
        )}
      </form>
    </Box>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button type="submit" colorScheme="xblue" className="w-full">
          Join
        </Button>
      ) : (
        <Spinner />
      )}
    </>
  );
}
