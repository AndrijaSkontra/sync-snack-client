"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserEventCard from "./UserEventCard";
import {
  Box,
  Button,
  Divider,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Separator } from "@/components/ui/separator";

export default function EventGridWithOrders() {
  const { data: session, status }: any = useSession();
  const [event, setEvent]: any = useState();
  const [orders, setOrders]: any = useState();
  useEventData(setEvent, setOrders, status, session);
  const toast = useToast();

  function cancelOrder(orderId: any) {
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
        removeFromOrdersList(orderId);
      }
    });
  }

  function finishOrder(orderId: any) {
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
          description: "The order was finished",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
          colorScheme: "xorange",
        });
        removeFromOrdersList(orderId);
      }
    });
  }

  function removeFromOrdersList(orderId: any) {
    const newOrders = orders.filter((order: any) => order.orderId !== orderId);
    setOrders(newOrders);
  }

  return (
    <Box className="grid grid-cols-1 md:grid-cols-3">
      <Box className="flex flex-col items-center col-span-3">
        <Heading>My Event</Heading>
        <UserEventCard event={event} orders={orders} />
        <Divider className="mt-4" />
        <Heading className="self-start text-lg font-bold mt-2">
          TODO orders:{" "}
        </Heading>
      </Box>
      {orders ? (
        orders.map((order: any, index: any) => {
          return (
            <Box
              key={order.orderId}
              className="border shadow-lg m-4 p-4 flex flex-col space-y-3"
            >
              <Box className="flex justify-between">
                <Box className="flex space-x-1">
                  <Text className="text-sm">{order.firstName}</Text>
                  <Text className="text-sm">{order.lastName}</Text>
                </Box>
                <Text className="text-gray-400">
                  {order.createdAt.split("T")[1].split(".")[0]}
                </Text>
              </Box>
              <Text className=" font-semibold text-lg">
                {order.additionalOptions.description}
              </Text>
              <Separator />
              <Box className="flex justify-between">
                <Button
                  colorScheme="xred"
                  onClick={() => cancelOrder(order.orderId)}
                >
                  Cancel
                </Button>
                <Button
                  className="mr-2"
                  onClick={() => finishOrder(order.orderId)}
                  colorScheme="xblue"
                >
                  Finish
                </Button>
              </Box>
            </Box>
          );
        })
      ) : (
        <Text>No orders</Text>
      )}
    </Box>
  );
}

function useEventData(
  setEvent: any,
  setOrders: any,
  status: any,
  session: any,
) {
  useEffect(() => {
    if (status === "authenticated") {
      // First fetch for event
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch event");
          }
          return res.json();
        })
        .then((data) => {
          setEvent(data);

          // Only proceed to fetch orders if the event is successfully fetched
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
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch orders");
          }
          return res.json();
        })
        .then((data) => setOrders(data))
        .catch((e) => console.error(e));
    }
  }, [status]);
}
