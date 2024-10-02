"use client";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Button,
  Box,
} from "@chakra-ui/react";
import NavLinks from "./NavLinks";
import InviteButton from "./InviteButton";

export default function SidebarGroupDrawer({ isOpen, onClose, group }: any) {
  if (!group) {
    return null;
  }
  const { name, groupId, description } = group;

  return (
    // make the placement 20 px from  the left edge of the view
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerContent style={{ marginLeft: "70px", width: "calc(100% - 20px)" }}>
        <DrawerCloseButton />
        <DrawerHeader>{name}</DrawerHeader>
        <DrawerBody className="flex flex-col">
          <NavLinks onClose={onClose} groupId={groupId} />
          <Box className="grow h-full flex justify-center items-end">
            <InviteButton />
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
