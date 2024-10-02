"use client";
import { handleRolesChange } from "@/app/server-actions/change-role-names";
import { Text, Box, Button, Input, Spinner, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UserRolesContext } from "../Providers";

const initialState = {
  message: "",
};

export default function AdminButtons() {
  const groupId: any = localStorage.getItem("GroupId");
  const [state, formAction] = useFormState(handleRolesChange, initialState);
  const [userRoleName, setUserRoleName] = useState("");
  const [adminRoleName, setAdminRoleName] = useState("");
  const [presidentRoleName, setPresidentRoleName] = useState("");
  const changedRoles: boolean = state.message === "Roles changed";
  const userRolesContext: any = useContext(UserRolesContext);
  const isAdmin =
    userRolesContext.userRoles.includes("ADMIN") ||
    userRolesContext.userRoles.includes("PRESIDENT");
  useResetForm(
    changedRoles,
    setAdminRoleName,
    setPresidentRoleName,
    setUserRoleName,
  );

  return (
    <Box>
      {isAdmin && (
        <form
          className="p-14 flex flex-col items-center space-y-2"
          action={formAction}
        >
          <Heading>Change roles</Heading>
          <Input
            variant="filled"
            placeholder="New user role"
            type="text"
            name="user"
            value={userRoleName}
            onChange={(e) => setUserRoleName(e.target.value)}
          />
          <Input
            variant="filled"
            placeholder="New admin role"
            type="text"
            name="admin"
            value={adminRoleName}
            onChange={(e) => setAdminRoleName(e.target.value)}
          />
          <Input
            variant="filled"
            placeholder="New president role"
            type="text"
            name="president"
            value={presidentRoleName}
            onChange={(e) => setPresidentRoleName(e.target.value)}
          />
          <Input
            variant="filled"
            type="hidden"
            name="groupId"
            value={groupId}
          />
          <Box className="flex space-x-2 items-center">
            <SubmitButton />
            <Button variant="outline" colorScheme="xred" type="reset">
              Clear
            </Button>
          </Box>
          {changedRoles ? (
            <Text className="text-green-500 text-sm">{state.message}</Text>
          ) : (
            <Text className="text-red-500 text-sm">{state.message}</Text>
          )}
        </form>
      )}
    </Box>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button type="submit" variant="outline" colorScheme="xorange">
          Modify Roles
        </Button>
      ) : (
        <Spinner />
      )}
    </>
  );
}

function useResetForm(
  changedRoles: boolean,
  setAdminRoleName: any,
  setPresidentRoleName: any,
  setUserRoleName: any,
) {
  useEffect(() => {
    if (changedRoles) {
      setAdminRoleName("");
      setUserRoleName("");
      setPresidentRoleName("");
    }
  }, [changedRoles]);
}
