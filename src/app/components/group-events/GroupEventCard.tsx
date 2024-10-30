import React, { useState, useEffect, useContext } from "react";
import { GroupEvent } from "@/commons/types";
import {
  Box,
  Flex,
  Text,
  Progress,
  Button,
  Tag,
  useDisclosure,
  useColorModeValue,
  Tooltip,
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

  useCalculateRemainingTime(setProgressValue, setRemainingSeconds, groupEvent, groupEventsContext);

  const truncatedDescription =
    groupEvent.description.length > 50
      ? `${groupEvent.description.slice(0, 30)}...`
      : groupEvent.description;


  return (
    <Box
      borderRadius="md"
      boxShadow="md"
      p={5}
      w="full"
      maxW={{ base: "100%", md: "320px" }}
      mx="auto"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.03)" }}
    >
      <Flex flexDirection="column" gap={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
              {groupEvent.title}
            </Text>
            <Tooltip label={groupEvent.description} placement="bottom-start" hasArrow>
              <Text fontSize="sm" color="gray.500" mt={1} noOfLines={1}>
                {truncatedDescription}
              </Text>
            </Tooltip>
          </Box>
          <Tag size="sm" colorScheme="blue" ml={3}>
            {groupEvent.eventType}
          </Tag>
        </Flex>

        <Flex alignItems="center" mt={4}>
          <Text fontSize="md">
            {groupEvent.userProfileFirstName} {groupEvent.userProfileLastName}
          </Text>
        </Flex>

        <Button colorScheme="xorange" onClick={onOpen} size="sm" mt={4}>
          {t("Make Order")}
        </Button>
        <Progress
          mt={3}
          value={progressValue}
          colorScheme="green"
          borderRadius="md"
        />
        <Text fontSize="sm" textAlign="center" mt={2}>
          {Math.floor(remainingSeconds / 60)}m {remainingSeconds % 60}s
        </Text>
      </Flex>
      <CreateOrderModal onClose={onClose} isOpen={isOpen} event={groupEvent} />
    </Box>
  );
}

function useCalculateRemainingTime(
  setProgressValue: React.Dispatch<React.SetStateAction<number>>,
  setRemainingSeconds: React.Dispatch<React.SetStateAction<number>>,
  groupEvent: GroupEvent,
  groupEventsContext: any
) {
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const pendingUntil = new Date(groupEvent.pendingUntil + "Z");
      const remaining = Math.max(0, pendingUntil.getTime() - now.getTime());
      setRemainingSeconds(Math.floor(remaining / 1000));

      const elapsed = now.getTime() - new Date(groupEvent.createdAt + "Z").getTime();
      const total = pendingUntil.getTime() - new Date(groupEvent.createdAt + "Z").getTime();
      setProgressValue((elapsed / total) * 100);

      if (elapsed >= total) {
        groupEventsContext.setGroupEvents((prevEvents: any) =>
          prevEvents.filter((e: any) => e.eventId !== groupEvent.eventId)
        );
      }
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [groupEvent, groupEventsContext, setProgressValue, setRemainingSeconds]);
}
