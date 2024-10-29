import React from "react";
import { Box, Image, Text, Tag } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface NotificationProps {
  notification: {
    notificationType: "ORDER" | string;
    firstName: string;
    lastName: string;
    title?: string;
    description?: string;
    photoUri?: string;
    profilePhoto?: string;
    createdAt: string;
    eventType?: string;
    additionalOptions?: {
      description: string;
    };
  };
}

export default function NotificationCard({ notification }: NotificationProps) {
  const {
    firstName,
    lastName,
    title,
    description,
    photoUri,
    createdAt,
    eventType,
    notificationType,
  } = notification;

  const router = useRouter();
  const isOrderNotification = notificationType === "ORDER";

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleNotificationClick = () => {
    const route = isOrderNotification ? "/orders" : "/group-events";
    router.push(route);
  };

  // Common styles for both notification types
  const cardStyles = {
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "lg",
      bg: "gray.50",
    },
  };

  const renderProfileImage = () => (
    <Image
      src={photoUri || notification.profilePhoto}
      objectFit="cover"
      fallbackSrc="/template-user.png"
      alt={`${firstName} ${lastName}`}
      boxSize="50px"
      borderRadius="full"
      mr="4"
    />
  );

  const renderContent = () => (
    <>
      <Box className="flex items-center">{renderProfileImage()}</Box>
      <Box className="flex-1 px-4">
        {isOrderNotification ? (
          <>
            <Text>Order on your event:</Text>
            <Text fontSize="sm" color="gray.500">
              {notification.additionalOptions?.description}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="xl" fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {description}
            </Text>
          </>
        )}
      </Box>
      <Box className="text-right">
        <Tag size="md" variant="subtle" mb="2" colorScheme="xorange">
          {isOrderNotification ? "ORDER" : eventType}
        </Tag>
        <Text fontSize="sm">{formatTime(createdAt)}</Text>
      </Box>
    </>
  );

  return (
    <Box
      className="flex justify-between items-center"
      p="4"
      borderRadius="lg"
      boxShadow="md"
      mb="4"
      onClick={handleNotificationClick}
      sx={cardStyles}
      role="button"
      tabIndex={0}
      aria-label={`Notification: ${isOrderNotification ? "Order" : eventType}`}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleNotificationClick();
        }
      }}
    >
      {renderContent()}
    </Box>
  );
}