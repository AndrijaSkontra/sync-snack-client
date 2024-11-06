"use client";

import {
  Box,
  Button,
  Input,
  Spinner,
  Tag,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IsMyEventVisibleContext } from "../Providers";
import revalidateStuff from "@/app/server-actions/revalidate-action";

export default function UserEventCard({ event, orders }: any) {
  // TODO: get orderId from orders
  let orderIds: string[] | undefined;
  if (orders) {
    orderIds = orders.map((order: any) => order.orderId);
  }
  const { data: session, status }: any = useSession();
  const toast = useToast();
  const router = useRouter();
  const context = useContext(IsMyEventVisibleContext);

  if (!event) {
    return (
      <Box className="mt-20 mx-2 p-4 border rounded-lg md:mt-4">
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
      mt={{ base: 20, md: 2 }}
      mx={2}
      p={6}
      borderWidth="1px"
      shadow="lg"
      borderRadius="lg"
      overflow="hidden"
      maxWidth="md"
      width="full"
    >
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {event.title}
        </Text>
      </Box>

      <Box mb={4}>
        <Tooltip
          label={event.description}
          isDisabled={event.description.length <= 50}
        >
          <Text color="gray.500">
            {event.description.length > 50
              ? `${event.description.slice(0, 50)}...`
              : event.description}
          </Text>
        </Tooltip>
      </Box>

      <Box display="flex" justifyContent="space-between" gap={2}>
        <Button
          onClick={() => {
            context.setIsMyEventVisible(false);
            revalidateStuff();
            handleAllOrders("CANCELLED");
          }}
          colorScheme="red"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            revalidateStuff();
            handleAllOrders("COMPLETED");
          }}
          colorScheme="blue"
        >
          Finish
        </Button>
      </Box>
    </Box>
  );
}
