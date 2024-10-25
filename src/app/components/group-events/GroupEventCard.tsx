import React, { useState, useEffect, useContext } from "react";
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
import { GroupEventsContext } from "../Providers";

export default function GroupEventCard({
  groupEvent,
}: {
  groupEvent: GroupEvent;
}) {
  const t = useTranslations("Group events page");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const groupEventsContext = useContext(GroupEventsContext);
  useCalculateRemainingTime(
    setProgressValue,
    setRemainingSeconds,
    groupEvent,
    groupEventsContext,
  );

  return (
    <Box className="border rounded-lg p-4 w-full mx-auto shadow-lg">
      <Box className="flex justify-between mb-4">
        <Box>
          <Box className="flex md:flex-row flex-col md:space-x-2 space-y-2 md:space-y-0">
            <Text fontWeight="bold" fontSize="lg">
              {groupEvent.title}
            </Text>
            <Tag className="w-min" colorScheme="xblue">
              {groupEvent.eventType}
            </Tag>
          </Box>
          <Text className="mt-2" fontSize="sm">
            {groupEvent.description}
          </Text>
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
  groupEventsContext: any,
) {
  useEffect(() => {
    const updateRemainingTime = () => {
      let now = new Date();
      const pendingUntil = new Date(groupEvent.pendingUntil + "Z");
      const totalDuration = pendingUntil.getTime() - now.getTime();
      const remaining = Math.max(0, totalDuration);
      const seconds = Math.floor(remaining / 1000);
      setRemainingSeconds(seconds);
    
      const elapsedTime =
        now.getTime() - new Date(groupEvent.createdAt + "Z").getTime();
      const totalTime =
        pendingUntil.getTime() - new Date(groupEvent.createdAt + "Z").getTime();
      const progress = (elapsedTime / totalTime) * 100;
      console.log(progress, " - ", elapsedTime, " - ", totalTime);
      setProgressValue(Math.min(100, Math.max(0, progress)));
    
      if (
        progress > 100 &&
        groupEventsContext.groupEvents.some(
          (group: any) => group.eventId === groupEvent.eventId,
        )
      ) {
        // Filter out the event with matching eventId
        groupEventsContext.setGroupEvents((prevEvents: any) =>
          prevEvents.filter(
            (group: any) => group.eventId !== groupEvent.eventId
          )
        );
      }
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [
    groupEvent.pendingUntil,
    groupEvent.createdAt,
    setRemainingSeconds,
    setProgressValue,
  ]);
}
