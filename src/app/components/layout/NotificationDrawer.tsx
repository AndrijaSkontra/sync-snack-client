import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NotificationType } from "@/commons/types";
import NotificationCard from "./NotificationCard";

export default function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  setNotifications,
}: any) {
  const { data: session, status } = useSession();
  useNotifications(setNotifications, status, session);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Notifications</DrawerHeader>
        <DrawerBody>
          {notifications.map((notification: any, index: number) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function useNotifications(setNotifications: any, status: any, session: any) {
  useEffect(() => {
    if (status === "authenticated") {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/recipient?page=&size=`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
            groupId: `${localStorage.getItem("GroupId")}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data: any) => {
          if (data) {
            setNotifications(data);
          }
        })
        .catch((e) => console.info(e.message));
    }
  }, [status]);
}
