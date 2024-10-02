import React from "react";
import { Box, Image, Text, Tag } from "@chakra-ui/react";

export default function NotificationCard({
  notification,
}: {
  notification: any;
}) {
  const {
    firstName,
    lastName,
    title,
    description,
    photoUri,
    createdAt,
    eventType,
  } = notification;

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isOrderNotification = notification.notificationType === "ORDER";

  return (
    <>
      {isOrderNotification ? (
        <Box
          className="flex justify-between items-center"
          p="4"
          borderRadius="lg"
          boxShadow="md"
          mb="4"
        >
          <Box className="flex items-center">
            {photoUri ? (
              <Image
                src={photoUri}
                objectFit="cover"
                fallbackSrc="/template-user.png"
                boxSize="50px"
                borderRadius="full"
                mr="4"
              />
            ) : (
              <Image
                src={notification.profilePhoto}
                objectFit="cover"
                alt={`${firstName} ${lastName}`}
                boxSize="50px"
                borderRadius="full"
                mr="4"
              />
            )}
          </Box>

          <Box className="flex-1 px-4">
            <Text>Order on your event:</Text>
            <Text fontSize="sm" color="gray.500">
              {notification.additionalOptions.description}
            </Text>
          </Box>

          <Box className="text-right">
            <Tag size="md" variant="subtle" mb="2" colorScheme="xorange">
              ORDER
            </Tag>
            <Text fontSize="sm">{formatTime(createdAt)}</Text>
          </Box>
        </Box>
      ) : (
        <Box
          className="flex justify-between items-center"
          p="4"
          borderRadius="lg"
          boxShadow="md"
          mb="4"
        >
          <Box className="flex items-center">
            {photoUri ? (
              <Image
                src={photoUri}
                objectFit="cover"
                alt={`${firstName} ${lastName}`}
                boxSize="50px"
                borderRadius="full"
                mr="4"
              />
            ) : (
              <Image
                src={notification.profilePhoto}
                objectFit="cover"
                alt={`${firstName} ${lastName}`}
                boxSize="50px"
                borderRadius="full"
                mr="4"
              />
            )}
          </Box>

          <Box className="flex-1 px-4">
            <Text fontSize="xl" fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {description}
            </Text>
          </Box>

          <Box className="text-right">
            <Tag size="md" variant="subtle" mb="2" colorScheme="xorange">
              {eventType}
            </Tag>
            <Text fontSize="sm">{formatTime(createdAt)}</Text>
          </Box>
        </Box>
      )}
    </>
  );
}
