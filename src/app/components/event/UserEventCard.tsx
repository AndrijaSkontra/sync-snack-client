"use client";

import {
  Box,
  Button,
  Input,
  Spinner,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserEventCard({ event, orders }: any) {
  // TODO: get orderId from orders
  let orderIds: string[] | undefined;
  if (orders) {
    orderIds = orders.map((order: any) => order.orderId);
  }
  const { data: session, status }: any = useSession();
  const toast = useToast();
  const router = useRouter();

  if (!event) {
    return (
      <Box className="mt-20 mx-2 px-40 py-16 border rounded-lg md:mt-4">
        <Spinner />
      </Box>
    );
  }

  function handleAllOrders(newStatus: string) {
    if (!orderIds) {
      toast({
        title: "No orders to update",
        status: "error",
        duration: 3000,
        isClosable: true,
        colorScheme: "xred",
      });
      return;
    }
    if (status === "authenticated") {
      orderIds.forEach((orderId) => {
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update?orderId=${orderId}&status=${newStatus}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          },
        );
      });
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/update?eventId=${event.eventId}&status=COMPLETED`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      router.push("/group-events");
    }
  }

  return (
    <Box
      className="mt-20 mx-2 md:mt-2 border shadow-lg rounded-lg p-6 w-96"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box className="mb-4">
        <Text className="font-bold text-xl">{event.title}</Text>
      </Box>

      <Box className="mb-4">
        <Text className="text-sm">{event.description}</Text>
      </Box>

      <Box className="flex justify-center space-x-2">
        <Button
          onClick={() => handleAllOrders("COMPLETED")}
          colorScheme="xblue"
        >
          Finish
        </Button>
        <Button onClick={() => handleAllOrders("CANCELLED")} colorScheme="xred">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
