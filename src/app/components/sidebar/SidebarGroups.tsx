"use client";
import {
  Box,
  Button,
  IconButton,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarGroupDrawer from "./SidebarDrawer";
import { PlusIcon } from "@heroicons/react/24/outline";
import JoinCreateGroupModal from "../modals/JoinCreateGroupModal";
import { useEffect, useState } from "react";
import { useGroups } from "@/commons/custom-hooks";
import { useFormState } from "react-dom";
import { handleGroupCreate } from "@/app/server-actions/create-group";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleGroupJoin } from "@/app/server-actions/group-join";

const initialState: any = {
  message: null,
  errors: null,
};

/**
 * This is the sidebar where all the groups icon are shown.
 * When clicked it will open a drawer with group options.
 * Also link to profile options is here.
 * To fetch groups we use the custom hook useGroups.
 * The form state in declared here so the group data is fetched every time,
 * state is passed deep down in to the CreateGroupForm.tsx
 * @since 9.3.2024. 9:00
 */
export default function SidebarGroups({ accessToken }: any) {
  const [state, formAction] = useFormState(handleGroupCreate, initialState);
  const [joinState, joinFormAction] = useFormState(
    handleGroupJoin,
    initialState,
  );
  const { groups, error } = useGroups(accessToken, state, joinState);
  const [activeGroup, setActiveGroup] = useState(null);
  const { data: session, status }: any = useSession();

  /**
   * This is used for group links drawer and modal
   * @see https://v2.chakra-ui.com/docs/components/drawer
   */
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isGroupModalOpen,
    onOpen: onGroupModalOpen,
    onClose: onGroupModalClose,
  } = useDisclosure();

  const drawerBgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      className="flex flex-col space-y-2 p-2 h-full shadow-lg"
      bgColor={drawerBgColor}
    >
      {groups.map((group: any, index: number) => (
        <Image
          key={index}
          borderRadius="full"
          border={
            localStorage.getItem("GroupId") === group.groupId ? "solid 4px" : ""
          }
          borderColor={
            localStorage.getItem("GroupId") === group.groupId
              ? "xorange.500"
              : ""
          }
          objectFit="cover"
          src={group.photoUrl}
          fallbackSrc="/fallback-group.png"
          boxSize={14}
          onClick={() => {
            setActiveGroup(group);
            onDrawerOpen();
          }}
        />
      ))}
      <IconButton
        aria-label="Add Group"
        icon={<PlusIcon />}
        colorScheme="xblue"
        isRound={true}
        boxSize={14}
        onClick={onGroupModalOpen}
      />
      <SidebarGroupDrawer
        group={activeGroup}
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
      />
      <JoinCreateGroupModal
        state={state}
        formAction={formAction}
        joinState={joinState}
        joinFormAction={joinFormAction}
        isOpen={isGroupModalOpen}
        onClose={onGroupModalClose}
      />
    </Box>
  );
}
// <Box className="grow flex items-end">
//   {status === "authenticated" && (
//     <Image
//       src={session.user.profileUri}
//       fallbackSrc="/template-user.png"
//       boxSize={14}
//       borderRadius="full"
//     />
//   )}
// </Box>
