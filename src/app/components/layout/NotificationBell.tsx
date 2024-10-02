"use client";
import {
  Box,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// import { BellIcon } from "@heroicons/react/24/outline";
import { Client } from "@stomp/stompjs";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import NotificationDrawer from "./NotificationDrawer";
import { NotificationType } from "@/commons/types";
import { GroupEventsContext } from "../Providers";
import { BellIcon } from "@chakra-ui/icons";

export default function NotificationBell() {
  const { data: session, status }: any = useSession();
  const toast = useToast();
  const [isBellNotified, setIsBellNotified] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const groupEventContext = useContext(GroupEventsContext);
  useSubscribeToWS(
    session,
    setIsBellNotified,
    toast,
    status,
    setNotifications,
    groupEventContext.setGroupEvents,
  );

  const bgColor = useColorModeValue("xblue.500", "xblue.400");
  const bgColorN = useColorModeValue("yellow.500", "yellow.400");
  const bellColor = useColorModeValue("white", "black");

  return (
    <Box
      onClick={() => {
        onOpen();
        setIsBellNotified(false);
      }}
      bgColor={isBellNotified ? bgColorN : bgColor}
      className={clsx("py-2 px-4 rounded-md shadow-md", {
        "shadow-md animate-[wiggle_0.3s_ease-in-out_infinite]": isBellNotified,
      })}
    >
      <BellIcon boxSize={6} textColor={bellColor} />
      <NotificationDrawer
        isOpen={isOpen}
        onClose={onClose}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </Box>
  );
}

function useSubscribeToWS(
  session: any,
  setIsBellNotified: any,
  toast: any,
  status: any,
  setNotifications: any,
  setGroupEvents: any,
) {
  const clientRef = useRef<Client | null>(null);
  useEffect(() => {
    if (status === "authenticated") {
      const activeUser: any = session.user;
      const client = new Client({
        brokerURL: `ws://localhost:8080/ws`,
        onConnect: () => {
          client.subscribe(
            `/topic/orders/${activeUser.userProfileId}`,
            (message: any) => {
              if (
                JSON.parse(message.body).userProfileId !==
                activeUser.userProfileId
              ) {
                setIsBellNotified(true);
                toast({
                  title: "Order",
                  description: "New order on your event",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  colorScheme: "xblue",
                });
              }
            },
          );
          client.subscribe(
            // this is for the event
            `/topic/users/${activeUser.userProfileId}`,
            (message: any) => {
              console.log("message", JSON.parse(message.body));
              if (
                JSON.parse(message.body).userProfileId !==
                activeUser.userProfileId
              ) {
                setIsBellNotified(true);
                const bodyObject = JSON.parse(message.body);
                const groupEventObject = {
                  eventId: bodyObject.eventId,
                  title: bodyObject.title,
                  eventType: bodyObject.eventType,
                  description: bodyObject.description,
                  userProfileFirstName: bodyObject.firstName,
                  userProfileLastName: bodyObject.lastName,
                  pendingUntil: bodyObject.pendingUntil,
                  createdAt: bodyObject.createdAt,
                };
                setGroupEvents((prev: any) => [...prev, groupEventObject]);
                // add message.body to be the first in the list of notifications...
                setNotifications((prev: any) => [
                  JSON.parse(message.body),
                  ...prev,
                ]);
                setNotifications((prev: any) => [
                  JSON.parse(message.body),
                  ...prev,
                ]);
                toast({
                  title: "Event",
                  description: "New event in your group",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  colorScheme: "xblue",
                });
              }
            },
          );
        },
        onDisconnect: () => {
          console.log("Disconnected");
        },
        onStompError: (frame) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
      });

      clientRef.current = client;
      client.activate();

      return () => {
        client.deactivate();
      };
    }
  }, [status]);
}
