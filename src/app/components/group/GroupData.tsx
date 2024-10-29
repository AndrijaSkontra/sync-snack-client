"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Spinner,
  Image,
  Tag,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import EditGroupModal from "../modals/EditGroupModal";
import { UserRolesContext } from "../Providers";

export default function GroupData({ session }: any) {
  const [reload, setReload] = useState("");
  const rolesContext: any = useContext(UserRolesContext);
  const jwtToken = session.user.accessToken;
  const [group, setGroup]: any = useState();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  useGroupData(jwtToken, setGroup, setLoading, session, reload);
  const [userRoles, setUserRoles]: any = useState();
  const [transfromRoles, setTransfromRoles] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useMemberRole(
    jwtToken,
    setUserRoles,
    session,
    setIsLoadingRoles,
    setTransfromRoles,
  );

  useEffect(() => {
    if (transfromRoles) {
      setUserRoles(transformingRoles(userRoles, transfromRoles));
    }
  }, [transfromRoles]);

  if (isLoading && isLoadingRoles) {
    return (
      <Box className="flex h-full w-full border justify-center items-center">
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      {typeof group === "undefined" ? (
        <Text>No group found</Text>
      ) : (
        <Box className="flex items-center space-x-4 justify-center">
          <Box position="relative">
            <Image
              objectFit="cover"
              rounded="full"
              borderRadius="full"
              maxWidth={150}
              maxHeight={150}
              minWidth={100}
              minHeight={100}
              boxSize={150}
              border="solid"
              borderColor="xblue.400"
              borderWidth={3}
              alt="nopic"
              src={group.photoUrl}
              fallbackSrc="/fallback-group.png"
            />
            <Heading
              position="absolute"
              top="20%"
              left="50%"
              transform="translate(-50%, -50%)"
              color="white"
              fontWeight="bold"
              zIndex="1"
              className="text-2xl"
            >
              &nbsp;
            </Heading>
          </Box>
          <Box className="flex flex-col items-center">
            <Heading>{group.name}</Heading>
            <Text>{group.description}</Text>
            <Box className="flex space-x-2 mt-2 justify-center">
              <Text className="font-bold italic">Your roles:</Text>
              {userRoles &&
                userRoles.map((role: any, index: any) => {
                  return (
                    <Box key={index}>
                      <Tag colorScheme="xorange">{role}</Tag>
                    </Box>
                  );
                })}
            </Box>
            {rolesContext.userRoles &&
              rolesContext.userRoles.includes("PRESIDENT") && (
                <Button
                  onClick={onOpen}
                  variant="outline"
                  colorScheme="xblue"
                  className="mt-10"
                >
                  Edit Group
                </Button>
              )}
          </Box>
          <EditGroupModal
            onClose={onClose}
            isOpen={isOpen}
            session={session}
            setReload={setReload}
          />
        </Box>
      )}
    </>
  );
}

function useGroupData(
  jwtToken: any,
  setGroup: any,
  setLoading: any,
  session: any,
  reload: any,
) {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/${localStorage.getItem("GroupId")}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching group data:", error);
      });
  }, [session, jwtToken, reload, setGroup, setLoading]);
}
function useMemberRole(
  jwtToken: any,
  setUserRoles: any,
  session: any,
  setIsLoadingRoles: any,
  setTransfromRoles: any,
) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/roles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        groupId: `${localStorage.getItem("GroupId")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRoles(data.roles);
        setIsLoadingRoles(false);
      })
      .catch((error) => {
        console.error("Error fetching user roles:", error);
      });
    fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/roles/${localStorage.getItem("GroupId")}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setTransfromRoles(data[0]);
      })
      .catch((error) => console.log("FAILED TO GET NEW ROLES", error.message));
  }, [session, jwtToken, setUserRoles, setIsLoadingRoles, setTransfromRoles]);
}

function transformingRoles(userRoles: any, transfromObject: any): string[] {
  const newRoles = userRoles.map((role: any) => {
    if (role === "USER") {
      return transfromObject.user;
    } else if (role === "ADMIN") {
      return transfromObject.admin;
    } else if (role === "PRESIDENT") {
      return transfromObject.president;
    } else {
      return role;
    }
  });
  return newRoles;
}
