"use client";

import { handleGroupJoin } from "@/app/server-actions/group-join";
import { Box, Button, Input, Spinner } from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";

const initialState: any = {
  message: null,
  errors: null,
};

export default function JoinGroupFormMobile() {
  const [joinState, joinFormAction] = useFormState(
    handleGroupJoin,
    initialState,
  );

  return (
    <div className="rounded-xl p-4 dark:bg-stone-900 bg-gray-100">
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
        {joinState.message !== "Group joined" ? (
          <p className="mt-4 text-red-500">{joinState.message}</p>
        ) : (
          <p className="mt-4 text-green-500">{joinState.message}</p>
        )}
      </form>
    </div>
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
