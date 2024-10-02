"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserEventCard from "./UserEventCard";
import { Box, Button, Divider, Text } from "@chakra-ui/react";

export default function EventGridWithOrders() {
  const { data: session, status }: any = useSession();
  const [event, setEvent]: any = useState();
  const [orders, setOrders]: any = useState();
  useEventData(setEvent, setOrders, status, session);

  return (
    <Box className="grid grid-cols-1 md:grid-cols-3">
      <Box className="flex flex-col items-center col-span-3">
        <UserEventCard event={event} orders={orders} />
        <Divider className="mt-4" />
      </Box>
      {orders &&
        orders.map((order: any, index: any) => {
          return (
            <Box key={index} className="border shadow-lg m-4 p-4">
              <Text>{order.firstName}</Text>
              <Text>{order.lastName}</Text>
              <Text>{order.additionalOptions.description}</Text>
              <Button colorScheme="xblue">Finish</Button>
              <Button colorScheme="xred">Cancel</Button>
            </Box>
          );
        })}
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
