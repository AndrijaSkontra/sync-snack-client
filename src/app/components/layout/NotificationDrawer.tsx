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
  Box,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NotificationType } from "@/commons/types";
import NotificationCard from "./NotificationCard";
import { RepeatIcon } from "@chakra-ui/icons";

export default function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  setNotifications,
}: any) {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(0);
  const [isLoadMoreDisplayed, setIsLoadMoreDisplayed] = useState(true);
  useNotifications(
    setNotifications,
    status,
    session,
    page,
    setIsLoadMoreDisplayed,
  );

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Notifications</DrawerHeader>
        <DrawerBody>
          {notifications.lenght !== 0 ? (
            notifications.map((notification: any, index: number) => (
              <NotificationCard key={index} notification={notification} />
            ))
          ) : (
            <Text className="text-center">So empty here</Text>
          )}
          <Box className="flex justify-center items-center">
            {isLoadMoreDisplayed ? (
              <Button onClick={() => setPage((prev) => prev + 1)}>
                Load more
              </Button>
            ) : (
              <Text className="text-red-300">No more notifications</Text>
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function useNotifications(
  setNotifications: any,
  status: any,
  session: any,
  page: any,
  setIsLoadMoreDisplayed: any,
) {
  useEffect(() => {
    if (status === "authenticated") {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/recipient?page=${page}&size=8`,
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
          // if (data) {
          //   setNotifications(data);
          // }
          if (typeof data !== "undefined") {
            data.map((notification: any) => {
              // const stringNotification = JSON.stringify(notification);
              setNotifications((prev: any) => [...prev, notification]);
            });
          }
        })
        .catch((e) => {
          setIsLoadMoreDisplayed(false);
          console.info(e.message);
        });
    }
  }, [
    status,
    page,
    session?.user.accessToken,
    setNotifications,
    setIsLoadMoreDisplayed,
  ]);
}
