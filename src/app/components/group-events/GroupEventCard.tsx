import React, { useState, useEffect } from "react";
import { GroupEvent } from "@/commons/types";
import {
  Box,
  Text,
  Progress,
  Button,
  useDisclosure,
  Tag,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import CreateOrderModal from "../modals/CreateOrderModal";

export default function GroupEventCard({
  groupEvent,
}: {
  groupEvent: GroupEvent;
}) {
  const t = useTranslations("Group events page");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useCalculateRemainingTime(setProgressValue, setRemainingSeconds, groupEvent);

  return (
    <Box className="border rounded-lg p-4 w-full mx-auto h-44 shadow-lg">
      <Box className="flex justify-between mb-4">
        <Box>
          <Box className="flex space-x-2">
            <Text fontWeight="bold" fontSize="lg">
              {groupEvent.title}
            </Text>
            <Tag colorScheme="xblue">{groupEvent.eventType}</Tag>
          </Box>
          <Text fontSize="sm">{groupEvent.description}</Text>
        </Box>
        <Box>
          <Text fontSize="sm">{groupEvent.userProfileFirstName}</Text>
          <Text fontSize="sm">{groupEvent.userProfileLastName}</Text>
        </Box>
      </Box>
      <Box className="flex justify-center mb-4">
        <Button colorScheme="xorange" onClick={onOpen}>
          {t("Make Order")}
        </Button>
      </Box>
      <Progress
        className="rounded-full"
        size="sm"
        colorScheme="xorange"
        value={progressValue}
      />
      <Text className="text-sm mt-2 text-center">
        {Math.floor(remainingSeconds / 60)}m {remainingSeconds % 60}s
      </Text>
      <CreateOrderModal onClose={onClose} isOpen={isOpen} event={groupEvent} />
    </Box>
  );
}

function useCalculateRemainingTime(
  setProgressValue: any,
  setRemainingSeconds: any,
  groupEvent: any,
) {
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const pendingUntil = new Date(groupEvent.pendingUntil);
      const totalDuration = pendingUntil.getTime() - now.getTime();
      const remaining = Math.max(0, totalDuration);
      const seconds = Math.floor(remaining / 1000);

      setRemainingSeconds(seconds);

      // Calculate progress value (percentage of time elapsed)
      const elapsedTime =
        now.getTime() - new Date(groupEvent.createdAt).getTime();
      const totalTime =
        pendingUntil.getTime() - new Date(groupEvent.createdAt).getTime();
      const progress = (elapsedTime / totalTime) * 100;
      setProgressValue(Math.min(100, Math.max(0, progress)));
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [groupEvent.pendingUntil, groupEvent.createdAt]);
}
