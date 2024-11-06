"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserEventCard from "./UserEventCard";
import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { OrderEventCardComponent } from "./OrderForEventCardComponent";
import useNewOrdersStore from "@/app/server-actions/zustandscripts/fetchNewOrders";

export default function EventGridWithOrders() {
  const { data: session, status }: any = useSession();
  const [event, setEvent]: any = useState();
  const [orders, setOrders]: any = useState([]);
  const toast = useToast();
  const shouldRefetchOrders = useNewOrdersStore((state) => state.value);
  const setRefetchOrders = useNewOrdersStore((state) => state.setValue);

  useEffect(() => {
    console.log(shouldRefetchOrders);
    if (status === "authenticated" && (shouldRefetchOrders || !event)) {
      getEventData(setEvent, setOrders, status, session);
      setRefetchOrders(false);
    }
  }, [status, shouldRefetchOrders, session, setRefetchOrders]);

  const cancelOrder = (orderId: any) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update?orderId=${orderId}&status=CANCELLED`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    ).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Cancelled order",
          description: "The order was cancelled",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
          colorScheme: "xorange",
        });
        setOrders((prevOrders: any) =>
          prevOrders.filter((order: any) => order.orderId !== orderId),
        );
      }
    });
  };

  const finishOrder = (orderId: any) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update?orderId=${orderId}&status=COMPLETED`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    ).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Finished order",
          description: "The order was completed",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
          colorScheme: "xorange",
        });
        setOrders((prevOrders: any) =>
          prevOrders.filter((order: any) => order.orderId !== orderId),
        );
      }
    });
  };

  return (
    <Box className="grid grid-cols-1 md:grid-cols-3">
      <Box className="flex flex-col items-center col-span-3">
        <Heading>My Event</Heading>
        <UserEventCard event={event} orders={orders} />
        <Divider className="mt-4" />
        <Heading className="self-start text-lg font-bold mt-2">
          TODO orders:
        </Heading>
      </Box>
      <OrderEventCardComponent
        orders={orders}
        cancelOrder={cancelOrder}
        finishOrder={finishOrder}
      />
    </Box>
  );
}

function getEventData(
  setEvent: any,
  setOrders: any,
  status: any,
  session: any,
) {
  if (status === "authenticated") {
    console.log("helloo");
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
        groupId: `${localStorage.getItem("GroupId")}`,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch event"),
      )
      .then((data) => {
        setEvent(data);
        return fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/event/${data.eventId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          },
        );
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch orders"),
      )
      .then(setOrders)
      .catch(console.error);
  }
}
